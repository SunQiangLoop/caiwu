

        // =========================================================================
        // ★★★ 会计引擎核心配置与执行器 ★★★
        // =========================================================================

/*         // 1. 定义全局分录模板 
        const GLOBAL_TEMPLATES = [
            {
                id: 'TPL_REV_CONFIRM',
                voucherWord: '记',
                trigger: '对账单确认',
                entries: [
                    { dir: '借', subject: '1122 应收账款', valType: 'total' }, // 价税合计
                    { dir: '贷', subject: '6001 主营业务收入', valType: 'noTax' }, // 不含税
                    { dir: '贷', subject: '2221 应交税费-待转销项税额', valType: 'tax' } // 税额
                ]
            },
            {
                id: 'TPL_TAX_INVOICE',
                voucherWord: '转',
                trigger: '发票开具',
                entries: [
                    { dir: '借', subject: '2221 应交税费-待转销项税额', valType: 'tax' },
                    { dir: '贷', subject: '2221 应交税费-应交增值税(销项)', valType: 'tax' }
                ]
            },
            {
                id: 'TPL_AR_VERIFY',
                voucherWord: '银',
                trigger: '收款核销',
                entries: [
                    { dir: '借', subject: '1002 银行存款', valType: 'total' },
                    { dir: '贷', subject: '1122 应收账款', valType: 'total' }
                ]
            }
        ];
 */



        // 2. 会计引擎执行函数 (核心中的核心)
        function runAccountingEngine(triggerName, context) {
            // context = { client: '客户名', amount: '金额字符串' }

            console.log(`[会计引擎] 收到触发信号: ${triggerName}, 金额: ${context.amount}`);

            // A. 查找匹配的模板
            const tpl = GLOBAL_TEMPLATES.find(t => t.trigger === triggerName);
            if (!tpl) {
                console.warn("未找到对应模板，跳过凭证生成。");
                return;
            }

            // B. 计算金额 (假设税率 9%)
            const total = parseFloat(context.amount.replace(/,/g, ''));
            const noTax = total / 1.09;
            const tax = total - noTax;

            // C. 生成分录行
            const lines = tpl.entries.map(rule => {
                let val = 0;
                if (rule.valType === 'total') val = total;
                if (rule.valType === 'noTax') val = noTax;
                if (rule.valType === 'tax') val = tax;

                return {
                    summary: `${triggerName} - ${context.client}`,
                    account: rule.subject,
                    debit: rule.dir === '借' ? val.toFixed(2) : '',
                    credit: rule.dir === '贷' ? val.toFixed(2) : ''
                };
            });

            // D. 生成凭证对象
            const newVoucher = {
                id: tpl.voucherWord + new Date().getFullYear() + Math.floor(Math.random() * 10000 + 1000),
                date: new Date().toISOString().split('T')[0],
                amount: total.toFixed(2),
                user: '会计引擎(自动)',
                status: '已记账', // 自动生成的默认为已记账
                lines: lines
            };

            // E. 存入凭证数据库
            let vList = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
            vList.unshift(newVoucher);
            sessionStorage.setItem('ManualVouchers', JSON.stringify(vList));

            // F. 记录日志
            if (typeof addAuditLog === 'function') {
                addAuditLog({
                    level: '低风险', time: new Date().toLocaleString(), user: '系统',
                    module: '会计引擎', action: '自动生成凭证', detail: `触发:${triggerName}, 凭证:${newVoucher.id}`
                });
            }

            return newVoucher.id; // 返回凭证号供提示
        }


        // --- 全局变量：用于在列表页和详情页之间传数据 ---
        var g_currentVoucher = null;

        // =========================================================================
        // 核心修复：辅助函数必须定义在loadContent调用之前
        // =========================================================================


        /**
         * 初始化所有主菜单项为折叠状态 (只在页面加载时执行一次)
         */
        function initializeMenuState() {
            document.querySelectorAll('.sidebar .sub-menu').forEach(subMenu => {
                // 确保子菜单高度为 0
                subMenu.style.maxHeight = "0";
            });
            document.querySelectorAll('.sidebar .menu-item').forEach(menuItem => {
                // 确保所有菜单项都有 collapsed 类，且移除 expanded 类
                menuItem.classList.remove('expanded');
                if (!menuItem.classList.contains('dashboard-item')) {
                    menuItem.classList.add('collapsed');
                }
            });
        }

        /**
         * 切换主菜单项的子菜单显示/隐藏
         */
        function toggleSubMenu(element) {
            const subMenu = element.nextElementSibling;

            // 确保子菜单存在，并且它是一个 sub-menu div
            if (subMenu && subMenu.classList.contains('sub-menu')) {
                // 切换展开/折叠状态
                if (element.classList.contains('collapsed')) {
                    // 展开
                    element.classList.remove('collapsed');
                    element.classList.add('expanded');
                    subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                } else {
                    // 折叠
                    element.classList.remove('expanded');
                    element.classList.add('collapsed');
                    subMenu.style.maxHeight = "0";
                }
            }

            // 激活/反激活菜单项 (点击主菜单项时，不应该激活它，除非它没有子菜单)
            if (!subMenu || !subMenu.classList.contains('sub-menu')) {
                const currentActive = document.querySelector('.sidebar .active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                element.classList.add('active');
            }
        }

        /**
         * 目录搜索/过滤功能
         */
        function filterMenu() {
            const input = document.getElementById('menuSearch');
            const filter = input.value.toUpperCase().trim();
            const menuGroups = document.querySelectorAll('.sidebar > .menu-group-title');

            if (filter === '') {
                // 搜索框清空时，恢复到默认的折叠状态和可见性
                initializeMenuState();

                document.querySelectorAll('.sidebar .menu-item, .sidebar .menu-group-title').forEach(item => item.style.display = 'block');
                document.querySelectorAll('.sidebar .sub-menu-item').forEach(item => item.style.display = 'block');

                return;
            }

            // 遍历所有菜单组进行搜索
            menuGroups.forEach(group => {
                let groupVisible = false;
                let nextElement = group.nextElementSibling;

                // 遍历组内的所有主菜单项 (menu-item)
                while (nextElement && !nextElement.classList.contains('menu-group-title') && nextElement.classList.contains('menu-item')) {
                    const menuItem = nextElement;
                    const subMenu = menuItem.nextElementSibling;
                    let mainMatch = false;

                    // 1. 检查主菜单项文本是否匹配
                    const mainText = menuItem.textContent.toUpperCase();
                    if (mainText.indexOf(filter) > -1) {
                        mainMatch = true;
                    }

                    // 2. 检查子菜单是否匹配
                    let subItemVisible = false;
                    if (subMenu && subMenu.classList.contains('sub-menu')) {
                        subMenu.querySelectorAll('.sub-menu-item').forEach(subItem => {
                            const subText = subItem.textContent.toUpperCase();
                            if (subText.indexOf(filter) > -1) {
                                subItem.style.display = 'block';
                                subItemVisible = true;
                            } else {
                                subItem.style.display = 'none';
                            }
                        });
                    }

                    // 3. 确定菜单项的最终可见性
                    if (mainMatch || subItemVisible) {
                        menuItem.style.display = 'block';
                        groupVisible = true;

                        // 搜索匹配时，强制展开该菜单项
                        if (subMenu && subMenu.classList.contains('sub-menu')) {
                            menuItem.classList.remove('collapsed');
                            menuItem.classList.add('expanded');
                            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                        }
                        // 如果是主菜单匹配，确保子菜单项全部可见
                        if (mainMatch && subMenu) {
                            subMenu.querySelectorAll('.sub-menu-item').forEach(subItem => subItem.style.display = 'block');
                        }

                    } else {
                        // 不匹配，隐藏
                        menuItem.style.display = 'none';
                        if (subMenu) {
                            menuItem.classList.remove('expanded');
                            menuItem.classList.add('collapsed');
                            subMenu.style.maxHeight = "0";
                        }
                    }

                    // 移动到下一个主菜单项，跳过子菜单容器
                    nextElement = subMenu && subMenu.classList.contains('sub-menu') ? subMenu.nextElementSibling : menuItem.nextElementSibling;
                }

                // 根据组内是否有可见项来显示/隐藏组标题
                group.style.display = groupVisible ? 'block' : 'none';
            });

            // 确保概览/仪表盘也能被搜索
            const dashboardItem = document.querySelector('.sidebar > .menu-item.dashboard-item');
            if (dashboardItem) {
                const dashboardText = dashboardItem.textContent.toUpperCase();
                dashboardItem.style.display = (dashboardText.indexOf(filter) > -1) ? 'block' : 'none';
            }
        }




        // 默认加载仪表盘并在加载后初始化菜单状态（全部折叠）
        window.onload = function () {
            loadContent('Dashboard');
            initializeMenuState();
        };


        // --- 1. 打开凭证详情 (抓取当前行数据) ---
        window.openVoucherDetail = function (btnElement) {
            const row = btnElement.closest('tr');

            // 抓取数据
            const id = row.querySelector('.val-id').innerText;
            const date = row.querySelector('.val-date').innerText;
            const summary = row.querySelector('.val-summary').innerText;
            const debit = row.querySelector('.val-debit').innerText;
            const credit = row.querySelector('.val-credit').innerText;

            // 判断是不是红字凭证 (根据颜色或金额是否为负)
            const isRed = debit.includes('-') || row.style.backgroundColor.includes('rgb(255, 240, 240)');

            // 存入全局变量
            window.g_currentVoucher = {
                id: id,
                date: date,
                summary: summary,
                debit: debit,
                credit: credit,
                isRed: isRed
            };

            // 跳转页面
            loadContent('VoucherDetail');
        }



        /**
             * 模拟红冲操作 (修复版：真实生成数据并保存)
             * @param {HTMLElement} element - 按钮元素
             * @param {string} originalVoucherId - 原凭证号
             */
        window.handleRedDash = function (element, originalVoucherId) {
            if (!confirm(`⚠️ 【高危操作】\n\n确定要对凭证 ${originalVoucherId} 执行红冲操作吗？\n\n系统将生成一张负数金额的红字凭证，此操作不可逆。`)) return;

            // 1. 读取现有凭证库
            let list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");

            // 2. 找到原始凭证
            const originalIndex = list.findIndex(v => v.id === originalVoucherId);
            if (originalIndex === -1) {
                alert("❌ 错误：未找到原始凭证数据，无法红冲。");
                return;
            }
            const original = list[originalIndex];

            // 3. 生成红字凭证 ID
            // 简单的生成规则：把 "记" 换成 "红"，或者加后缀
            const redId = originalVoucherId.includes('记')
                ? originalVoucherId.replace('记', '红')
                : '红' + originalVoucherId;

            // 4. ★★★ 核心：克隆并取反金额 ★★★
            const redLines = original.lines.map(line => ({
                summary: `[冲销] ${line.summary}`, // 摘要加前缀
                account: line.account,
                // 如果有金额，就加负号
                debit: line.debit ? `-${line.debit.toString().replace(/-/g, '')}` : '',
                credit: line.credit ? `-${line.credit.toString().replace(/-/g, '')}` : ''
            }));

            // 计算总金额 (负数)
            const redAmount = `-${original.amount.toString().replace(/-/g, '')}`;

            const redVoucher = {
                id: redId,
                date: new Date().toISOString().slice(0, 10),
                amount: redAmount,
                user: '当前用户',
                status: '已记账', // 红冲凭证直接生效
                isRed: true,      // 标记为红字，详情页会变色
                lines: redLines   // ★★★ 必须保存分录行，详情页才有数据！
            };

            // 5. 更新原始凭证状态为“已冲销”
            list[originalIndex].status = '已冲销';

            // 6. 插入新凭证并保存
            list.unshift(redVoucher);
            sessionStorage.setItem('ManualVouchers', JSON.stringify(list));

            // 7. 记录审计日志
            if (typeof addAuditLog === 'function') {
                addAuditLog({
                    level: '高危',
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    module: '凭证管理',
                    action: '执行红冲',
                    detail: `原凭证:${originalVoucherId} -> 红字凭证:${redId}`
                });
            }

            alert(`✅ 红冲成功！\n已生成红字凭证：${redId}`);

            // 8. 刷新列表页面 (让界面重新渲染真实数据)
            loadContent('VoucherQueryPrint');
        }



        // ============================================
        // 销项发票台账 - 核心业务逻辑
        // ============================================

        // 1. 功能：从对账单生成开票申请 (Open Statement Modal)
        window.openStatementModal = function () {
            // 模拟弹窗：这里为了简便使用 prompt，实际开发会用 Modal 组件
            const input = prompt("🧾 模拟弹窗：请选择要开票的对账单。\n\n请输入对账单号 (例如：DZ202511001)：", "DZ202511001");

            if (input) {
                // 模拟后端处理并插入新行
                const tableBody = document.querySelector('#invoiceTable tbody');
                const newRow = `
                    <tr style="background-color: #e6f7ff; animation: highlight 1s;">
                        <td class="val-inv-no" style="color:#ccc;">-</td>
                        <td class="val-client">新选客户(来自${input})</td>
                        <td class="val-amount">1,000.00</td>
                        <td class="val-tax">60.00</td>
                        <td class="val-total">1,060.00</td>
                        <td class="val-date">-</td>
                        <td class="status-cell"><span style="color: #f39c12; font-weight:bold;">待开票</span></td>
                        <td>
                            <a href="javascript:void(0)" onclick="generateInvoice(this)" style="color:#27ae60; font-weight:bold; border:1px solid #27ae60; padding:2px 6px; border-radius:4px; text-decoration:none;">生成发票</a>
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('afterbegin', newRow);
                alert(`✅ 已成功从对账单【${input}】生成开票申请！\n\n列表第一行已新增一条“待开票”记录。`);
            }
        }

        // 2. 功能：生成发票 (Generate Invoice)
        window.generateInvoice = function (btn) {
            const row = btn.closest('tr');
            const client = row.querySelector('.val-client').innerText;
            const total = row.querySelector('.val-total').innerText;

            if (!confirm(`❓ 确认要为【${client}】金额 ${total} 执行开票操作吗？\n\n系统将连接税控接口生成发票号码。`)) return;

            // 模拟开票过程
            btn.innerText = "开票中...";
            btn.style.color = "#999";

            setTimeout(() => {
                // 生成模拟发票号
                const newInvNo = "13000" + Math.floor(Math.random() * 90000 + 10000);
                const today = new Date().toISOString().split('T')[0];

                // 更新界面状态
                row.querySelector('.val-inv-no').innerText = newInvNo;
                row.querySelector('.val-inv-no').style.color = "#333";
                row.querySelector('.val-date').innerText = today;
                row.querySelector('.status-cell').innerHTML = '<span style="color: #27ae60;">已开票</span>';

                // 替换操作按钮：变为 查看 | 红冲
                const actionCell = btn.parentElement;
                actionCell.innerHTML = `
                    <a href="javascript:void(0)" onclick="viewInvoiceDetail('${inv.no}')" style="color:#3498db;">查看</a>
                    | 
                    <a href="javascript:void(0)" onclick="handleInvoiceRedDash(this)" style="color:#e74c3c;">冲红</a>
                `;

                row.style.backgroundColor = "#fff"; // 移除高亮
                alert(`🎉 开票成功！\n\n发票号码：${newInvNo}\n状态已更新。`);
            }, 1000);
        }


        /**
 * 模拟红冲操作的函数 (对应“红冲”按钮)
 * @param {HTMLElement} element - 被点击的元素
 * @param {string} voucherId - 要冲销的凭证编号
 */
        function handleRedDash(element, voucherId) {
            if (confirm(`确定要对凭证 ${voucherId} 执行红冲操作吗？\n\n系统将生成一张红字冲销凭证，并要求重新录入正确的凭证。`)) {
                // 实际应用中：此处会调用后端接口，生成红字凭证，并刷新列表
                alert(`【系统模拟】\n已对凭证 ${voucherId} 执行冲红操作。\n请查看列表中的红字冲销凭证记录。`);

                // 模拟状态变更或跳转到红冲页面
                // 在原型中，我们简单地弹窗提示
            }
        }

        /**
         * 模拟红冲操作的函数 (对应“红冲”按钮)
         * 新增动态插入红字凭证的逻辑。
         * @param {HTMLElement} element - 被点击的元素 (操作按钮)
         * @param {string} originalVoucherId - 要冲销的蓝字凭证编号
         */
        function handleRedDash(element, originalVoucherId) {
            if (confirm(`确定要对凭证 ${originalVoucherId} 执行红冲操作吗？\n\n系统将生成一张红字冲销凭证。\n\n【注意】此操作不可逆，请在审计日志中查看记录。`)) {

                const originalRow = element.closest('tr');
                const voucherTableBody = originalRow.closest('tbody');

                // --- 1. 模拟禁用原凭证的红冲按钮 ---
                const originalActionCell = originalRow.querySelector('td:last-child');
                originalActionCell.innerHTML = `
            <span style="color: #f39c12; font-weight: bold;">已红冲</span> | 
            <a href="javascript:void(0)" style="color:#3498db; cursor: not-allowed;">查看明细</a>
        `;

                // --- 2. 模拟生成新的红字冲销凭证行 ---
                const originalDebit = originalRow.querySelector('.val-debit').textContent.replace(/,/g, '');
                const originalCredit = originalRow.querySelector('.val-credit').textContent.replace(/,/g, '');

                const newRedVoucherId = originalVoucherId.replace(/记|自/, '冲') + 'R'; // 模拟生成红字编号

                const newRowHTML = `
            <tr id="row-${newRedVoucherId}">
                <td><input type="checkbox" disabled></td>
                <td class="val-id" style="color: #e74c3c; font-weight: bold;">${newRedVoucherId} (红字)</td>
                <td class="val-date">${new Date().toISOString().slice(0, 10)}</td>
                <td class="val-summary" style="color: #e74c3c;">冲销原凭证: ${originalVoucherId}</td>
                <td class="val-debit" style="color: #e74c3c;">(${parseFloat(originalDebit).toFixed(2)})</td>
                <td class="val-credit" style="color: #e74c3c;">(${parseFloat(originalCredit).toFixed(2)})</td>
                <td class="status-cell"><span style="color: #e74c3c; font-weight: bold;">已冲销</span></td>
                <td>
                    <a href="javascript:void(0)" onclick="openVoucherDetail(this)" style="color:#3498db;">查看明细</a> | 
                    <a href="javascript:void(0)" onclick="handleRedDashUndo(this, '${newRedVoucherId}', '${originalVoucherId}')" style="color:#2980b9; font-weight: bold;">撤销红冲</a>
                </td>
            </tr>
        `;

                // 将新行插入到表格顶部
                voucherTableBody.insertAdjacentHTML('afterbegin', newRowHTML);

                alert(`【系统提示】凭证 ${originalVoucherId} 已被成功冲红。\n新的红字冲销凭证 ${newRedVoucherId} 已生成。`);
            }
        }

        /**
         * 模拟撤销红冲操作的函数 (对应“撤销红冲”按钮)
         * 新增恢复原凭证红冲按钮的逻辑。
         * @param {HTMLElement} element - 被点击的元素 (操作按钮)
         * @param {string} redVoucherId - 要撤销的红字凭证编号
         * @param {string} originalVoucherId - 原始凭证编号
         */
        function handleRedDashUndo(element, redVoucherId, originalVoucherId) {
            if (confirm(`警告：确定要撤销对凭证 ${redVoucherId} 的冲销操作吗？\n\n该红字凭证将被作废，原凭证 (${originalVoucherId}) 将恢复可冲红状态。`)) {

                // --- 1. 模拟恢复原凭证的红冲按钮 ---
                // 找到原始凭证所在的行 (假设列表中还存在)
                const originalRow = document.querySelector(`.val-id:contains('${originalVoucherId}')`).closest('tr');
                if (originalRow) {
                    const originalActionCell = originalRow.querySelector('td:last-child');
                    originalActionCell.innerHTML = `
                <a href="javascript:void(0)" onclick="openVoucherDetail(this)" style="color:#3498db;">查看明细</a> | 
                <a href="javascript:void(0)" onclick="handleRedDash(this, '${originalVoucherId}')" style="color:#f39c12; font-weight: bold;">红冲</a>
            `;
                }

                // --- 2. 移除红字凭证行 ---
                const row = element.closest('tr');
                if (row) {
                    row.remove();
                }

                alert(`【系统提示】红字凭证 ${redVoucherId} 已被作废。\n原凭证 ${originalVoucherId} 已恢复可冲红状态。`);
            }
        }



        // ==========================================================
        // 期末处理与结转逻辑 (终极修复版：增加结账锁定校验)
        // ==========================================================

        /** 1. 执行结转 (带结账锁定校验) */
        window.executeTransfer = function (period) {
            // ★★★ 核心校验：检查是否已结账 ★★★
            if (sessionStorage.getItem('2025-11-MonthClosed') === 'true') {
                alert("⛔ 操作被拦截！\n\n当前会计期间【已结账锁定】。\n如需重新结转损益，请先前往【月末结账】模块执行反结账。");
                return;
            }

            // ... (下面的逻辑保持不变) ...

            // 1. 先计算
            const res = calculateRealProfit();

            if (res.count === 0) {
                alert("⚠️ 系统未检测到【已审核】或【已记账】的凭证。\n请先去审核凭证。");
                return;
            }

            const profitStr = (res.profit >= 0 ? '+' : '') + res.profit.toLocaleString('en-US', { minimumFractionDigits: 2 });

            if (!confirm(`❓ 确认执行【${period}】损益结转吗？\n\n本期净利润：${profitStr}`)) return;

            sessionStorage.setItem('2025-11-ProfitTransferred', 'true');
            sessionStorage.setItem('2025-11-ProfitAmount', profitStr);
            sessionStorage.setItem('2025-11-ProfitDetail', JSON.stringify(res));

            // 记日志
            addAuditLog({ level: '中风险', time: new Date().toLocaleString(), user: '当前用户', module: '结转损益', action: '执行结转', detail: profitStr });

            alert(`✅ 结转成功！\n损益类科目余额已清零。`);
            loadContent('PeriodEndProfit');
        }

        /** 2. 冲回结转 (带结账锁定校验) */
        window.reverseTransfer = function (period) {
            // ★★★ 核心校验：检查是否已结账 ★★★
            if (sessionStorage.getItem('2025-11-MonthClosed') === 'true') {
                alert("⛔ 操作被拦截！\n\n当前会计期间【已结账锁定】。\n如需冲回损益，请先前往【月末结账】模块执行反结账。");
                return;
            }

            // ... (下面的逻辑保持不变) ...

            if (!confirm(`⚠️ 警告：确定要冲回【${period}】吗？\n此操作将作废结转凭证。`)) return;

            sessionStorage.removeItem('2025-11-ProfitTransferred');

            // 记日志
            addAuditLog({ level: '高危', time: new Date().toLocaleString(), user: '当前用户', module: '结转损益', action: '冲回结转', detail: period });

            alert("✅ 已成功冲回！\n现在可以修改凭证或重新结转。");
            loadContent('PeriodEndProfit');
        }

        /**
           * 3. 查看结转凭证详情 (修正会计逻辑)
           */
        window.viewPLVoucher = function (voucherId) {
            // 读取刚才存的明细
            const detailStr = sessionStorage.getItem('2025-11-ProfitDetail');
            // 如果没有真实数据，就用默认假数据兜底
            const detail = detailStr ? JSON.parse(detailStr) : { income: 1125000, cost: 1000000, profit: 125000 };

            window.g_currentVoucher = {
                id: voucherId,
                date: '2025-11-30',
                debit: detail.income.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                credit: detail.income.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                lines: [
                    { zy: '结转本期收入', km: '6001 主营业务收入', jf: detail.income.toLocaleString('en-US', { minimumFractionDigits: 2 }), df: '' },
                    { zy: '结转成本费用', km: '6401/6602 等', jf: '', df: detail.cost.toLocaleString('en-US', { minimumFractionDigits: 2 }) },
                    { zy: '结转本年利润', km: '4103 本年利润', jf: '', df: detail.profit.toLocaleString('en-US', { minimumFractionDigits: 2 }) }
                ]
            };
            loadContent('VoucherDetail');
        }

        // --- 内部辅助：更新行样式为“已结转” ---
        function updateRowToTransferred(row, time, amount, voucherId, period) {
            row.querySelector('.time-cell').innerText = time;
            row.querySelector('.amount-cell').innerHTML = `<span style="color: #2980b9; font-weight:bold;">${amount}</span>`;
            row.querySelector('.voucher-cell').innerText = voucherId;
            row.querySelector('.status-cell').innerHTML = `<span style="color: #27ae60; font-weight: bold;">已结转</span>`;

            // 替换操作按钮为：冲回 | 查看
            row.querySelector('.action-cell').innerHTML = `
            <a href="javascript:void(0)" onclick="reverseTransfer('${period}', '${voucherId}', this)" style="color:#e74c3c;">冲回</a> | 
            <a href="javascript:void(0)" onclick="viewPLVoucher('${voucherId}')" style="color:#3498db;">查看凭证</a>
        `;
        }

        // --- 内部辅助：更新行样式为“未结转” ---
        function updateRowToPending(row, period) {
            row.querySelector('.amount-cell').innerHTML = `<span style="color: #f39c12;">待执行</span>`;
            row.querySelector('.voucher-cell').innerText = "-";
            row.querySelector('.status-cell').innerHTML = `<span style="color: #c0392b; font-weight: bold;">未结转</span>`;

            // 替换操作按钮为：执行
            row.querySelector('.action-cell').innerHTML = `
            <a href="javascript:void(0)" onclick="executeTransfer('${period}', this)" style="color:#27ae60; font-weight:bold;">执行</a>
        `;
        }


        /**
         * 1. 刷新/执行结账前检查 (Checklist)
         */
        // 修复点：补全了丢失的结尾符号，并增加了读取 sessionStorage 的联动逻辑
        window.refreshClosingCheck = function () {
            const tbody = document.getElementById('checkListBody');
            if (!tbody) return;

            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#3498db;">⏳ 系统正在进行数据一致性检查...</td></tr>';

            setTimeout(() => {
                // 1. 读取“结转损益”页面存下的状态
                const isTransferred = sessionStorage.getItem('2025-11-ProfitTransferred') === 'true';

                // 2. 根据状态决定“损益结转”这一项是通过还是失败
                const profitCheckStatus = isTransferred ? 'pass' : 'fail';
                const profitCheckMsg = isTransferred
                    ? '损益结转凭证已生成 (净利 +125,000.00)。'
                    : '尚未执行损益结转，损益科目余额不为0。';

                const checks = [
                    { name: '所有凭证已审核', status: 'pass', msg: '无待审核凭证。', link: '' },
                    { name: '所有业务单据已入账', status: 'warn', msg: '有 2 张运单结算单未自动生成凭证 (不影响结账)。', link: 'EngineMapping' },
                    { name: '已完成固定资产折旧计算', status: 'pass', msg: '折旧凭证已生成 (计 38,500.00)。', link: '' },
                    { name: '已完成损益类科目结转', status: profitCheckStatus, msg: profitCheckMsg, link: 'PeriodEndProfit' },
                    { name: '试算平衡检查', status: 'pass', msg: '借贷平衡 (差额 0.00)。', link: '' }
                ];

                let html = '';
                let allPass = true;

                checks.forEach(item => {
                    let statusHtml = '';
                    let actionHtml = '';

                    if (item.status === 'pass') {
                        statusHtml = `<span style="color: #27ae60; font-weight: bold;">✅ 通过</span>`;
                        actionHtml = `<span style="color:#ccc;">-</span>`;
                    } else if (item.status === 'warn') {
                        statusHtml = `<span style="color: #f39c12; font-weight: bold;">⚠️ 警告</span>`;
                        actionHtml = `<a href="javascript:void(0)" onclick="loadContent('${item.link}')" style="color:#3498db;">去处理</a>`;
                    } else if (item.status === 'fail') {
                        statusHtml = `<span style="color: #c0392b; font-weight: bold;">❌ 失败</span>`;
                        actionHtml = `<a href="javascript:void(0)" onclick="loadContent('${item.link}')" style="color:#c0392b; font-weight:bold; text-decoration:underline;">立即处理</a>`;
                        allPass = false;
                    }

                    html += `<tr><td>${item.name}</td><td>${statusHtml}</td><td>${item.msg}</td><td>${actionHtml}</td></tr>`;
                });

                tbody.innerHTML = html;

                // 3. 控制“结账”按钮是否可用
                const btnClose = document.getElementById('btnExecuteClose');
                if (allPass) {
                    g_isClosingReady = true;
                    btnClose.disabled = false;
                    btnClose.style.backgroundColor = "#c0392b";
                    btnClose.style.cursor = "pointer";
                    btnClose.innerText = "执行月末结账 (2025年11期)";
                } else {
                    g_isClosingReady = false;
                    btnClose.disabled = true;
                    btnClose.style.backgroundColor = "#95a5a6";
                    btnClose.style.cursor = "not-allowed";
                    btnClose.innerText = "无法结账 (请先处理失败项)";
                }

            }, 600);
        } // 

        window.executeMonthEndClose = function () {
            if (!g_isClosingReady) {
                alert("❌ 系统检查未通过！");
                return;
            }
            if (confirm(`🔒 确认对 [2025年11期] 进行月末结账吗？\n结账后数据将锁定。`)) {
                alert("✅ 结账成功！当前会计期间已切换为：[2025年12期]。");
                document.getElementById('currentPeriodDisplay').innerText = "2025年12期";
                document.getElementById('btnExecuteClose').disabled = true;
                document.getElementById('btnExecuteClose').innerText = "当前期间无需结账";
                document.getElementById('checkListBody').innerHTML = '<tr><td colspan="4" style="text-align:center; color:#27ae60;">新期间 [2025-12] 尚未开始，暂无数据需要检查。</td></tr>';
            }
        }


        /**
             * 3. [终极修复版] 反结账 (修复页面联动 + 确保记日志)
             */
        window.executeReOpen = function () {
            // 1. 读取当前状态
            const isClosed = sessionStorage.getItem('2025-11-MonthClosed') === 'true';

            // 如果还没结账，就不用反了
            if (!isClosed) {
                alert("⚠️ 当前期间尚未结账，无需操作。");
                return;
            }

            if (confirm("⚠️ 警告：确定要【反结账】吗？\n\n此操作将解锁 11 月数据，并记录高危审计日志。")) {

                // 2. 清除结账状态 (核心动作)
                sessionStorage.removeItem('2025-11-MonthClosed');

                // 3. 写入审计日志 (确保 addAuditLog 函数存在)
                if (typeof addAuditLog === 'function') {
                    addAuditLog({
                        level: '高危',
                        time: new Date().toLocaleString(),
                        user: '当前用户',
                        ip: '127.0.0.1',
                        module: '月末结账',
                        action: '执行反结账',
                        detail: '回退至2025-11期，解除数据锁定'
                    });
                } else {
                    console.error("addAuditLog 函数未定义，日志写入失败");
                }

                alert("✅ 反结账成功！\n\n当前期间已回退至 [2025年11期]。");

                // 4. ★★★ 关键修复：重新加载模块，刷新页面视图 ★★★
                // 之前是 refreshClosingCheck()，那只刷新表格，不刷新整体视图
                loadContent('PeriodEndClose');
            }
        }


        /**
         * 2. 执行月末结账动作
         */
        function executeMonthEndClose() {
            if (!g_isClosingReady) {
                alert("❌ 系统检查未通过，无法执行结账操作！\n请处理列表中的红字失败项。");
                return;
            }

            if (confirm(`🔒 【高风险操作确认】\n\n即将对 [2025年11期] 进行月末结账。\n\n结账后：\n1. 该期间所有凭证将无法修改或删除。\n2. 无法再录入该日期的业务单据。\n3. 会计期间将自动切换至 [2025年12期]。\n\n确定要继续吗？`)) {
                // 模拟结账过程
                alert("⏳ 正在锁定数据...\n正在备份期末账套...\n正在切换会计期间...");

                alert("✅ 结账成功！\n\n当前会计期间已切换为：[2025年12期]。");

                // 模拟刷新页面状态
                document.getElementById('currentPeriodDisplay').innerText = "2025年12期";
                document.getElementById('btnExecuteClose').disabled = true;
                document.getElementById('btnExecuteClose').innerText = "当前期间无需结账";
                document.getElementById('checkListBody').innerHTML = '<tr><td colspan="4" style="text-align:center; color:#27ae60;">新期间 [2025-12] 尚未开始，暂无数据需要检查。</td></tr>';
            }
        }

        /**
         * 3. 反结账 (Re-Open)
         */
        function executeReOpen() {
            // 简单模拟：只能反最近的一个月
            if (confirm(`⚠️ 【反结账警告】\n\n正在申请对 [2025年11期] 执行反结账操作。\n\n注意：\n1. 此操作将记录在【敏感操作日志】中。\n2. 11月的数据将恢复为可编辑状态，可能会影响报表数据。\n\n请输入“确认反结账”以继续：`)) {
                // 这里可以加一个 prompt 二次确认
                alert("✅ 反结账成功！\n\n会计期间已回退至：[2025年11期]。\n请尽快完成修正并重新结账。");
                refreshClosingCheck(); // 重新加载检查列表
                document.getElementById('currentPeriodDisplay').innerText = "2025年11期";
            }
        }

        // ==========================================================
        // 数据变更详情查看 (View Data Change Detail)
        // ==========================================================
        window.viewDataChangeDetail = function (btn) {
            // 获取当前行的数据
            const row = btn.closest('tr');
            const cells = row.querySelectorAll('td');

            const time = cells[0].innerText;
            const user = cells[1].innerText;
            const obj = cells[2].innerText;
            const id = cells[3].innerText;
            const field = cells[4].innerText;
            const oldVal = cells[5].innerText;
            const newVal = cells[6].innerText;

            // 模拟弹出一个详细的对比报告
            alert(
                `📝 【数据变更详情快照】\n` +
                `--------------------------------------------------\n` +
                `变更对象：${obj} (${id})\n` +
                `变更字段：【${field}】\n` +
                `--------------------------------------------------\n` +
                `🔴 变更前：${oldVal}\n` +
                `🟢 变更后：${newVal}\n` +
                `--------------------------------------------------\n` +
                `操作人：${user}\n` +
                `操作时间：${time}\n` +
                `操作 IP：192.168.1.X (内网)\n` +
                `--------------------------------------------------\n` +
                `系统判定风险：${field.includes('银行') || field.includes('额度') ? '高' : '低'}`
            );
        }

        // --- 内部辅助函数：专门用于写日志，减少重复代码 ---
        function _recordChange(objId, field, oldVal, newVal) {
            if (typeof addDataChangeLog === 'function') {
                addDataChangeLog({
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    object: '客户档案',
                    objId: objId,
                    field: field,
                    oldVal: oldVal,
                    newVal: newVal
                });
            }
        }

        // ==========================================================
        // 凭证录入逻辑 (关联敏感日志)
        // ==========================================================

        /**
             * 1. 重置/新建凭证 (清空表单)
             */
        window.resetVoucherForm = function () {
            // 1. 重新生成 HTML 结构 (恢复到初始的两行空分录)
            const tbody = document.getElementById('entry-table-body');
            tbody.innerHTML = `
            <tr>
                <td><input type="text" class="input-summary" placeholder="摘要" style="width: 95%;"></td>
                <td><input type="text" class="input-account" placeholder="科目代码" style="width: 95%;"></td>
                <td><input type="number" class="input-debit" oninput="calculateTotals()" placeholder="0.00" style="width: 95%; text-align: right;"></td>
                <td><input type="number" class="input-credit" oninput="calculateTotals()" placeholder="0.00" style="width: 95%; text-align: right;"></td>
            </tr>
            <tr>
                <td>
                    <div style="display:flex; align-items:center;">
                        <a href="javascript:void(0)" onclick="removeEntryRow(this)" style="color:#ccc; margin-right:5px; text-decoration:none; font-size:16px;">✕</a>
                        <input type="text" class="input-summary" placeholder="摘要" style="width: 90%;">
                    </div>
                </td>
                <td><input type="text" class="input-account" placeholder="科目代码" style="width: 95%;"></td>
                <td><input type="number" class="input-debit" oninput="calculateTotals()" placeholder="0.00" style="width: 95%; text-align: right;"></td>
                <td><input type="number" class="input-credit" oninput="calculateTotals()" placeholder="0.00" style="width: 95%; text-align: right;"></td>
            </tr>
        `;

            // 2. 生成新的凭证号
            const newId = `记${new Date().getFullYear()}11${Math.floor(Math.random() * 1000 + 1000)}`;
            document.getElementById('current-v-id').innerText = newId;

            // 3. 重置合计
            calculateTotals();

            // 4. 提示
            // alert("表单已清空，准备录入新凭证。"); // 嫌烦可以注释掉
        }

        // ==========================================================
        // 会计引擎配置 - 核心逻辑 (增删改查 & 状态控制)
        // ==========================================================

        /**
         * 1. 新增映射配置
         */
        window.addMapping = function () {
            const name = prompt("请输入配置名称：", "新业务收入规则");
            if (!name) return;

            const type = prompt("请输入源单据类型：", "费用报销单");
            const condition = prompt("请输入触发条件 (逻辑表达式)：", "状态=已审核");
            const template = prompt("请输入关联分录模板ID：", "TPL_EXP_GEN");

            const newId = "MAP_" + Math.floor(Math.random() * 10000);

            const newMapping = {
                id: newId,
                name: name,
                type: type,
                condition: condition,
                template: template,
                status: '启用' // 默认启用
            };

            // 保存
            let mappings = JSON.parse(sessionStorage.getItem('EngineMappings') || "[]");
            mappings.push(newMapping);
            sessionStorage.setItem('EngineMappings', JSON.stringify(mappings));

            // 记日志
            if (typeof addDataChangeLog === 'function') {
                addDataChangeLog({
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    object: '会计引擎',
                    objId: newId,
                    field: '新增规则',
                    oldVal: '-',
                    newVal: name
                });
            }

            alert("✅ 新增配置成功！");
            loadContent('EngineMapping');
        }

        /**
         * 2. 修改映射配置
         */
        window.editMapping = function (id) {
            let mappings = JSON.parse(sessionStorage.getItem('EngineMappings') || "[]");
            const item = mappings.find(m => m.id === id);

            if (!item) return;

            const newCondition = prompt(`正在修改【${item.name}】\n当前触发条件：${item.condition}\n\n请输入新条件：`, item.condition);

            if (newCondition && newCondition !== item.condition) {
                // 记录变更
                if (typeof addDataChangeLog === 'function') {
                    addDataChangeLog({
                        time: new Date().toLocaleString(),
                        user: '当前用户',
                        object: '会计引擎',
                        objId: id,
                        field: '触发条件',
                        oldVal: item.condition,
                        newVal: newCondition
                    });
                }

                item.condition = newCondition;
                sessionStorage.setItem('EngineMappings', JSON.stringify(mappings));
                alert("✅ 修改成功！");
                loadContent('EngineMapping');
            }
        }

        /**
         * 3. 切换状态 (启用/禁用) - 这是联动的关键！
         */
        window.toggleMappingStatus = function (id) {
            let mappings = JSON.parse(sessionStorage.getItem('EngineMappings') || "[]");
            const item = mappings.find(m => m.id === id);

            if (!item) return;

            const newStatus = item.status === '启用' ? '禁用' : '启用';
            const confirmMsg = newStatus === '禁用'
                ? `⚠️ 警告：禁用【${item.name}】后，前端相关业务单据将无法自动生成凭证！\n确定要禁用吗？`
                : `确认启用【${item.name}】吗？`;

            if (confirm(confirmMsg)) {
                item.status = newStatus;
                sessionStorage.setItem('EngineMappings', JSON.stringify(mappings));

                // 记日志
                if (typeof addDataChangeLog === 'function') {
                    addDataChangeLog({
                        time: new Date().toLocaleString(),
                        user: '当前用户',
                        object: '会计引擎',
                        objId: id,
                        field: '配置状态',
                        oldVal: item.status === '启用' ? '禁用' : '启用', // 注意这里是反的因为上面已经改了值，或者应该先记日志
                        newVal: newStatus
                    });
                }

                loadContent('EngineMapping');
            }
        }

        /**
         * 4. 模拟测试规则
         */
        window.testMapping = function () {
            // 模拟传入一个单据
            const mockDoc = { type: '客户结算单', status: '已确认', business: '陆运' };

            let mappings = JSON.parse(sessionStorage.getItem('EngineMappings') || "[]");
            // 查找匹配的规则
            const matched = mappings.find(m => m.type === mockDoc.type && m.status === '启用');

            if (matched) {
                alert(`✅ 测试成功！\n\n输入单据：${JSON.stringify(mockDoc)}\n匹配规则：${matched.name} (${matched.id})\n调用模板：${matched.template}\n\n结果：可以生成凭证。`);
            } else {
                alert(`❌ 测试失败。\n\n输入单据：${JSON.stringify(mockDoc)}\n\n原因：未找到匹配的【启用状态】规则，或规则条件不满足。`);
            }
        }


        /** 5. 删除映射配置 */
        window.deleteMapping = function (btn, id) {
            if (!confirm(`⚠️ 确认要删除配置【${id}】吗？\n此操作不可恢复！`)) return;

            let mappings = JSON.parse(sessionStorage.getItem('EngineMappings') || "[]");
            mappings = mappings.filter(m => m.id !== id);
            sessionStorage.setItem('EngineMappings', JSON.stringify(mappings));

            btn.closest('tr').remove();
        }




        /**
         * 核心辅助：根据凭证计算本期损益 (实现数据联动)
         */
        function calculateRealProfit() {
            const vouchers = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");

            let totalIncome = 0;  // 收入 (贷方)
            let totalCost = 0;    // 成本费用 (借方)

            vouchers.forEach(v => {
                // 只统计已生效的凭证
                if (v.status === '已审核' || v.status === '已记账') {
                    if (v.lines) {
                        v.lines.forEach(line => {
                            const code = line.account.split(' ')[0]; // 取科目代码
                            const debit = parseFloat(line.debit) || 0;
                            const credit = parseFloat(line.credit) || 0;

                            // 简单的损益识别逻辑：
                            // 60开头 = 收入 (取贷方)
                            if (code.startsWith('60') || code.startsWith('61') || code.startsWith('63')) {
                                totalIncome += credit;
                            }
                            // 64, 66, 67, 68开头 = 成本/费用 (取借方)
                            else if (code.startsWith('64') || code.startsWith('66') || code.startsWith('67') || code.startsWith('68')) {
                                totalCost += debit;
                            }
                        });
                    }
                }
            });

            return {
                income: totalIncome,
                cost: totalCost,
                profit: totalIncome - totalCost
            };
        }




        // ==========================================================
        // 业务与税务的连接器
        // ==========================================================
        window.confirmSettlement = function (type, id, client, amount) {
            if (!confirm(`确认【${id}】金额无误，并申请开票吗？`)) return;

            // 1. 更新源单据状态 (模拟)
            if (type === 'waybill') {
                let list = JSON.parse(sessionStorage.getItem('BizWaybills'));
                let item = list.find(i => i.id === id);
                if (item) item.status = '已结算';
                sessionStorage.setItem('BizWaybills', JSON.stringify(list));
                loadContent('SettlementWaybill'); // 刷新
            } else if (type === 'recon') {
                let list = JSON.parse(sessionStorage.getItem('BizRecons'));
                let item = list.find(i => i.id === id);
                if (item) item.status = '已确认';
                sessionStorage.setItem('BizRecons', JSON.stringify(list));
                loadContent('ReconSite'); // 刷新
            }

            // 2. ★★★ 核心：写入待开票队列 ★★★
            let queue = JSON.parse(sessionStorage.getItem('PendingInvoiceQueue') || "[]");

            // 防止重复添加
            if (!queue.some(q => q.sourceId === id)) {
                queue.push({
                    sourceId: id,
                    sourceType: type === 'waybill' ? '运单' : '对账单',
                    client: client,
                    amount: amount,
                    createTime: new Date().toLocaleString()
                });
                sessionStorage.setItem('PendingInvoiceQueue', JSON.stringify(queue));
            }

            alert("✅ 已确认！数据已推送到【销项发票台账】等待开票。");
        }


        /** 从对账单申请开票 */
        window.applyInvoiceFromRecon = function (reconId, client, amount) {
            if (!confirm(`确认将对账单【${reconId}】推送到开票系统吗？`)) return;

            // 1. 检查金额是否为负 (如果退款比运费还多，不能开票)
            if (parseFloat(amount) <= 0) {
                alert("❌ 对账金额为负或零，无需开票！");
                return;
            }

            // 2. 推送到发票待办
            let queue = JSON.parse(sessionStorage.getItem('PendingInvoiceQueue') || "[]");
            if (queue.some(q => q.sourceId === reconId)) return alert("⚠️ 已在列表中");

            queue.push({
                sourceId: reconId,
                sourceType: '对账单',
                client: client,
                amount: amount, // 这里传过去的是 100 (净额)，这是最合规的
                createTime: new Date().toLocaleString()
            });
            sessionStorage.setItem('PendingInvoiceQueue', JSON.stringify(queue));

            // 3. 更新状态
            let list = JSON.parse(sessionStorage.getItem('CustomerRecons'));
            let item = list.find(r => r.id === reconId);
            if (item) item.status = '开票中';
            sessionStorage.setItem('CustomerRecons', JSON.stringify(list));

            alert(`✅ 申请成功！\n\n已推送金额：${amount} (净额)\n\n*注：负数退款项已在对账阶段抵扣，不直接体现在开票列表中。`);
            loadContent('ReconCustomer');
        }


        /** 3. [跳转版] 查看对账单明细 (跳转到详情页) */
        window.viewReconDetails = function (reconId) {
            // 1. 找到对账单本身的信息
            const recons = JSON.parse(sessionStorage.getItem('CustomerRecons') || "[]");
            let recon = recons.find(r => r.id === reconId);

            if (!recon) {
                // 兜底：如果是点到了假数据，给个默认对象防止报错
                recon = { id: reconId, client: '演示客户', amount: '0.00', period: '2025-11', status: '未知' };
            }

            // 2. 存入全局变量 (供详情页读取)
            window.g_currentRecon = recon;

            // 3. 跳转
            loadContent('ReconDetail');
        }

        /** * 4. [升级版] 确认对账 
             * 逻辑变更：确认后，不仅更新本单状态，还自动生成一笔【应收账款】
             */
        window.confirmRecon = function (id) {
            if (!confirm(`模拟：客户已回传确认函，确认对账单【${id}】无误？\n\n注意：确认后将自动生成【应收账款】记录。`)) return;

            // 1. 读取对账单数据
            let recons = JSON.parse(sessionStorage.getItem('CustomerRecons') || "[]");
            let item = recons.find(r => r.id === id);

            if (item) {
                // --- A. 更新当前对账单状态 ---
                item.status = '已确认';
                sessionStorage.setItem('CustomerRecons', JSON.stringify(recons));

                // --- B. 联动更新关联运单状态 (保持之前的逻辑) ---
                let waybills = JSON.parse(sessionStorage.getItem('BizWaybills') || "[]");
                let updatedCount = 0;

                const vId = runAccountingEngine('对账单确认', { client: item.client, amount: item.amount });

                alert(`✅ 对账单已确认！\n1. 运单已锁定\n2. 应收已生成\n3. 自动生成凭证：${vId}`); // 提示里加上凭证号
                loadContent('ReconCustomer');

                waybills.forEach(w => {
                    if (w.reconId === id) {
                        w.status = '已对账';
                        updatedCount++;
                    }
                });
                sessionStorage.setItem('BizWaybills', JSON.stringify(waybills));

                // --- C. ★★★ 核心新增：自动生成应收账款记录 (Push to AR) ★★★ ---
                // 读取应收列表 (如果没有就初始化为空)
                let arList = JSON.parse(sessionStorage.getItem('ARStatements') || "[]");

                // 防止重复生成 (如果已经有这个单号了，就不加了)
                if (!arList.some(ar => ar.id === id)) {
                    arList.unshift({
                        id: item.id,             // 应收单号 = 对账单号
                        client: item.client,     // 客户名称
                        period: item.period,     // 账期
                        amount: item.amount,     // 应收总额
                        verified: '0.00',        // 已核销金额 (初始为0)
                        unverified: item.amount, // 待核销金额 (初始等于总额)
                        status: '未核销'         // 初始状态
                    });
                    sessionStorage.setItem('ARStatements', JSON.stringify(arList));
                }

                // --- D. 完成提示 ---
                alert(`✅ 对账单已确认！\n\n1. 关联的 ${updatedCount} 笔运单已锁定。\n2. 已自动在【应收管理】中生成一笔待核销的应收账款。`);
                loadContent('ReconCustomer');
            } else {
                alert("❌ 未找到该对账单数据。");
            }
        }


        /**
         * 2. 从对账单申请开票 (推送到发票池)
         * 点击“申请开票”时触发
         */
        window.applyInvoiceFromRecon = function (reconId, client, amount) {
            if (!confirm(`确认将对账单【${reconId}】推送到开票系统吗？`)) return;

            // 1. 推送到发票待办队列
            let queue = JSON.parse(sessionStorage.getItem('PendingInvoiceQueue') || "[]");

            // 防止重复提交
            if (queue.some(q => q.sourceId === reconId)) {
                alert("⚠️ 该对账单已在开票列表中，请勿重复提交。");
                return;
            }

            queue.push({
                sourceId: reconId,
                sourceType: '对账单',
                client: client,
                amount: amount,
                createTime: new Date().toLocaleString()
            });
            sessionStorage.setItem('PendingInvoiceQueue', JSON.stringify(queue));

            // 2. 更新对账单状态为“开票中”
            let list = JSON.parse(sessionStorage.getItem('CustomerRecons'));
            let item = list.find(r => r.id === reconId);
            if (item) {
                item.status = '开票中'; // 或者 '已申请'
                sessionStorage.setItem('CustomerRecons', JSON.stringify(list));
            }

            alert(`✅ 申请成功！\n数据已推送至【销项发票台账】，请通知财务开票。`);
            loadContent('ReconCustomer'); // 刷新
        }



        /** * 辅助：数字转中文大写金额 
             */
        function convertCurrency(money) {
            // 汉字数字
            var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
            // 基本单位
            var cnIntRadice = new Array('', '拾', '佰', '仟');
            var cnIntUnits = new Array('', '万', '亿', '兆');
            var cnDecUnits = new Array('角', '分', '毫', '厘');
            var cnInteger = '整';
            var cnIntLast = '圆';

            var maxNum = 999999999999999.9999;
            var integerNum;
            var decimalNum;
            var chineseStr = '';
            var parts;

            if (money == '') { return ''; }
            money = parseFloat(money);
            if (money >= maxNum) return '金额过大';
            if (money === 0) return cnNums[0] + cnIntLast + cnInteger;

            money = money.toString();
            if (money.indexOf('.') == -1) {
                integerNum = money;
                decimalNum = '';
            } else {
                parts = money.split('.');
                integerNum = parts[0];
                decimalNum = parts[1].substr(0, 4);
            }

            if (parseInt(integerNum, 10) > 0) {
                var zeroCount = 0;
                var IntLen = integerNum.length;
                for (var i = 0; i < IntLen; i++) {
                    var n = integerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            chineseStr += cnNums[0];
                        }
                        zeroCount = 0;
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                }
                chineseStr += cnIntLast;
            }

            if (decimalNum != '') {
                var decLen = decimalNum.length;
                for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }

            if (chineseStr == '') {
                chineseStr += cnNums[0] + cnIntLast + cnInteger;
            } else if (decimalNum == '') {
                chineseStr += cnInteger;
            }
            return chineseStr;
        }


        // 查看对账单明细
        // ==========================================================
        window.viewReconDetail = function (reconId) {
            console.log("🔍 [调试] 查看对账单明细:", reconId);

            // 保存当前查看的对账单ID
            sessionStorage.setItem('CurrentReconId', reconId);

            // 跳转到明细页
            loadContent('ReconDetail');
        }


        /**
             * 核心辅助：根据凭证计算本期损益 (实现数据联动)
             */
        function calculateRealProfit() {
            const vouchers = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");

            let totalIncome = 0;  // 收入 (贷方)
            let totalCost = 0;    // 成本费用 (借方)

            vouchers.forEach(v => {
                // 只统计已生效的凭证
                if (v.status === '已审核' || v.status === '已记账') {
                    if (v.lines) {
                        v.lines.forEach(line => {
                            const code = line.account.split(' ')[0]; // 取科目代码
                            const debit = parseFloat(line.debit) || 0;
                            const credit = parseFloat(line.credit) || 0;

                            // 简单的损益识别逻辑：
                            // 60开头 = 收入 (取贷方)
                            if (code.startsWith('60') || code.startsWith('61') || code.startsWith('63')) {
                                totalIncome += credit;
                            }
                            // 64, 66, 67, 68开头 = 成本/费用 (取借方)
                            else if (code.startsWith('64') || code.startsWith('66') || code.startsWith('67') || code.startsWith('68')) {
                                totalCost += debit;
                            }
                        });
                    }
                }
            });

            return {
                income: totalIncome,
                cost: totalCost,
                profit: totalIncome - totalCost
            };
        }


        // ==========================================================
        // ★★★ 核心修复补丁：期末结转与结账逻辑 (请放在 Script 最底部) ★★★
        // ==========================================================

        // 2. [修复版] 执行损益结转
        window.executeTransfer = function (period) {
            // 1. 先计算
            const res = calculateRealProfit();

            if (res.count === 0) {
                alert("⚠️ 系统未检测到【已审核】或【已记账】的凭证。\n\n请先去【凭证查询/审核】页面审核凭证，然后再来结转。");
                return;
            }

            const profitStr = (res.profit >= 0 ? '+' : '') + res.profit.toLocaleString('en-US', { minimumFractionDigits: 2 });

            if (!confirm(`❓ 确认执行【${period}】损益结转吗？\n\n📊 系统检测到：\n- 有效凭证：${res.count} 张\n- 总收入：${res.income}\n- 总成本费用：${res.cost}\n- 本期净利润：${profitStr}`)) return;

            // 2. 存入 Session
            sessionStorage.setItem('2025-11-ProfitTransferred', 'true');
            sessionStorage.setItem('2025-11-ProfitAmount', profitStr);
            sessionStorage.setItem('2025-11-ProfitDetail', JSON.stringify(res)); // 保存明细供查看

            // 3. 刷新页面
            alert(`✅ 结转成功！\n损益类科目余额已清零，差额转入本年利润。`);
            loadContent('PeriodEndProfit');
        }

        // 3. [修复版] 月末结账检查 (修复按钮无法点击)
        window.refreshClosingCheck = function () {
            const tbody = document.getElementById('checkListBody');
            if (!tbody) return; // 如果不在结账页面，退出

            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#3498db;">⏳ 系统正在自检...</td></tr>';

            setTimeout(() => {
                // 读取状态
                const isTransferred = sessionStorage.getItem('2025-11-ProfitTransferred') === 'true';

                // 构造检查项状态
                const statusHtml = isTransferred
                    ? '<span style="color:#27ae60; font-weight:bold;">✅ 通过</span>'
                    : '<span style="color:#c0392b; font-weight:bold;">❌ 失败</span>';

                const msg = isTransferred
                    ? '损益已结转。'
                    : '损益类科目有余额，请先执行结转。';

                const action = isTransferred
                    ? '-'
                    : `<a href="javascript:void(0)" onclick="loadContent('PeriodEndProfit')" style="color:#3498db; font-weight:bold;">去处理</a>`;

                // 渲染表格
                tbody.innerHTML = `
                <tr>
                    <td>所有凭证已审核</td>
                    <td><span style="color:#27ae60; font-weight:bold;">✅ 通过</span></td>
                    <td>无待审核凭证。</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>损益类科目结转</td>
                    <td>${statusHtml}</td>
                    <td>${msg}</td>
                    <td>${action}</td>
                </tr>
                <tr>
                    <td>试算平衡检查</td>
                    <td><span style="color:#27ae60; font-weight:bold;">✅ 通过</span></td>
                    <td>借贷平衡。</td>
                    <td>-</td>
                </tr>
            `;

                // 控制主按钮 (关键修复)
                const btnClose = document.getElementById('btnExecuteClose');
                if (btnClose) {
                    if (isTransferred) {
                        window.g_isClosingReady = true; // 设置全局变量
                        btnClose.disabled = false;
                        btnClose.style.backgroundColor = "#c0392b"; // 变红表示可点击
                        btnClose.style.cursor = "pointer";
                        btnClose.innerText = "执行月末结账 (2025年11期)";
                    } else {
                        window.g_isClosingReady = false;
                        btnClose.disabled = true;
                        btnClose.style.backgroundColor = "#95a5a6";
                        btnClose.innerText = "无法结账 (请先处理失败项)";
                    }
                }
            }, 500);
        }

        // 4. [修复版] 执行结账
        window.executeMonthEndClose = function () {
            if (!window.g_isClosingReady) {
                alert("❌ 检查未通过，无法结账。");
                return;
            }
            if (confirm("🔒 确认执行月末结账吗？\n\n结账后数据将被锁定，无法修改。")) {
                sessionStorage.setItem('2025-11-MonthClosed', 'true');
                alert("✅ 结账成功！会计期间已切换。");
                loadContent('PeriodEndClose'); // 刷新页面
            }
        }



        // ==========================================================
        // ★★★ 会计引擎核心：模板管理与自动生成 ★★★
        // ==========================================================

        // 1. 显示/隐藏表单
        window.showTemplateForm = function () {
            document.getElementById('tpl-list-view').style.display = 'none';
            document.getElementById('tpl-edit-view').style.display = 'block';
        }
        window.hideTemplateForm = function () {
            document.getElementById('tpl-list-view').style.display = 'block';
            document.getElementById('tpl-edit-view').style.display = 'none';
        }

        // 2. 保存模板
        window.saveTemplate = function () {
            const name = document.getElementById('tpl-name').value;
            const bizType = document.getElementById('tpl-bizType').value;
            const invType = document.getElementById('tpl-invType').value;

            if (!name) return alert("请输入模板名称");

            const newTpl = {
                id: 'TPL_' + Math.floor(Math.random() * 10000),
                name: name,
                matchRule: { bizType: bizType, invoiceType: invType },
                entries: [ // 简化的固定结构，实际可做动态
                    { dir: '借', subject: '1122 应收账款', amountType: '价税合计' },
                    { dir: '贷', subject: '6001 主营业务收入', amountType: '不含税金额' },
                    { dir: '贷', subject: '2221 应交税费-销项', amountType: '税额' }
                ],
                status: '启用'
            };

            let list = JSON.parse(sessionStorage.getItem('AutoVoucherTemplates') || "[]");
            list.push(newTpl);
            sessionStorage.setItem('AutoVoucherTemplates', JSON.stringify(list));

            alert("✅ 模板保存成功！");
            loadContent('EngineTemplate'); // 刷新
        }

        // 3. 删除模板
        window.deleteTemplate = function (id) {
            if (!confirm("确定删除此模板吗？")) return;
            let list = JSON.parse(sessionStorage.getItem('AutoVoucherTemplates') || "[]");
            list = list.filter(t => t.id !== id);
            sessionStorage.setItem('AutoVoucherTemplates', JSON.stringify(list));
            loadContent('EngineTemplate');
        }


        /** * ★★★ 核心修复：统一价税计算逻辑 (正算) ★★★ 
             */
        window.autoGenerateVoucher = function (invoiceData) {
            console.log("--------------------------------------------------");
            console.log("🔍 [引擎启动] 开始生成凭证...", invoiceData);

            // 1. 读取模板
            let templates = JSON.parse(sessionStorage.getItem('AutoVoucherTemplates') || "[]");

            // 防呆初始化
            if (templates.length === 0) {
                console.warn("⚠️ 检测到模板库为空，正在自动初始化默认模板...");
                templates = [{
                    id: 'TPL_DEF_001',
                    name: '系统默认陆运模板',
                    matchRule: { bizType: '陆运', invoiceType: '专用发票' },
                    entries: [
                        { dir: '借', subject: '1122 应收账款', amountType: '价税合计' },
                        { dir: '贷', subject: '6001 主营业务收入', amountType: '不含税金额' },
                        { dir: '贷', subject: '2221 应交税费-销项', amountType: '税额' }
                    ],
                    status: '启用'
                }];
                sessionStorage.setItem('AutoVoucherTemplates', JSON.stringify(templates));
            }

            // 2. 寻找匹配的模板
            const matchedTpl = templates.find(t => {
                const bizMatch = t.matchRule.bizType === '通用' ||
                    (invoiceData.bizType && invoiceData.bizType.includes(t.matchRule.bizType));
                const invMatch = (invoiceData.type && invoiceData.type.includes(t.matchRule.invoiceType));
                const statusMatch = t.status === '启用';
                return bizMatch && invMatch && statusMatch;
            });

            if (!matchedTpl) {
                console.warn("❌ 匹配失败！未找到符合条件的模板。");
                return null;
            }

            console.log("✅ 匹配成功！使用模板:", matchedTpl.name);

            // ============================================================
            // 3. ★★★ 核心修复：金额计算改为“正算” (与发票一致) ★★★
            // ============================================================
            // 假设输入的 1200 是不含税金额 (Base Amount)
            const net = parseFloat(invoiceData.amountStr.replace(/,/g, ''));

            // 税率 9% (实际项目应从配置读取)
            const taxRate = 0.09;

            const tax = net * taxRate;      // 税额 = 1200 * 0.09 = 108
            const total = net + tax;        // 总额 = 1200 + 108 = 1308
            // ============================================================

            // 4. 构造分录行
            let voucherLines = [];
            matchedTpl.entries.forEach(rule => {
                let val = 0;
                // 根据模板配置取不同的值
                if (rule.amountType.includes('价税') || rule.amountType.includes('总')) val = total;     // 取 1308
                else if (rule.amountType.includes('不含税') || rule.amountType.includes('净')) val = net; // 取 1200
                else if (rule.amountType.includes('税')) val = tax;    // 取 108

                voucherLines.push({
                    summary: `应收${invoiceData.client}运费`,
                    account: rule.subject,
                    debit: rule.dir === '借' ? val.toFixed(2) : '',
                    credit: rule.dir === '贷' ? val.toFixed(2) : ''
                });
            });

            // 5. 生成凭证对象
            const newVoucherId = "自" + new Date().getFullYear() + Math.floor(Math.random() * 10000);
            const newVoucher = {
                id: newVoucherId,
                date: new Date().toISOString().slice(0, 10),
                amount: total.toFixed(2), // 凭证总额应该是价税合计 (1308)
                user: '系统引擎',
                status: '待审核',
                lines: voucherLines
            };

            // 6. 保存到凭证库
            let voucherList = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
            voucherList.unshift(newVoucher);
            sessionStorage.setItem('ManualVouchers', JSON.stringify(voucherList));

            // 7. 记录日志
            if (typeof addAuditLog === 'function') {
                addAuditLog({
                    level: '系统',
                    time: new Date().toLocaleString(),
                    user: '系统引擎 (Robot)',
                    ip: 'Internal',
                    module: '会计引擎',
                    action: '自动生成凭证',
                    detail: `凭证:${newVoucherId}, 关联发票:${invoiceData.no || 'N/A'}, 借方总额:${total.toFixed(2)}`
                });
            }

            console.log(`💾 凭证 ${newVoucherId} 已保存。`);
            return newVoucherId;
        }

        /** * ★★★ 新增：客户驳回对账单 ★★★
         */
        window.rejectRecon = function (id) {
            const reason = prompt(`模拟：客户拒绝了对账单【${id}】。\n\n请输入驳回原因（如：运费计算错误、货物破损未抵扣）：`);
            if (!reason) return; // 用户取消

            // 1. 更新状态
            let recons = JSON.parse(sessionStorage.getItem('CustomerRecons') || "[]");
            let item = recons.find(r => r.id === id);

            if (item) {
                item.status = '已驳回';
                item.rejectReason = reason; // 记录原因
                sessionStorage.setItem('CustomerRecons', JSON.stringify(recons));

                // 2. 联动：把关联运单的状态回退吗？
                // 策略：通常运单状态可以保持“对账中”，或者回退到“已结算”等待重新生成。
                // 这里我们简单处理：只改对账单状态。

                // 3. 记日志
                if (typeof addAuditLog === 'function') {
                    addAuditLog({
                        level: '中风险',
                        time: new Date().toLocaleString(),
                        user: '外部客户',
                        module: '客户对账',
                        action: '驳回对账单',
                        detail: `单号:${id}, 原因:${reason}`
                    });
                }

                alert(`⛔ 已驳回！\n状态变更为【已驳回】，请根据客户反馈的原因进行修正。`);
                loadContent('ReconCustomer');
            }
        }

        /**
         * ★★★ 新增：财务修正后重新提交 ★★★
         */
        window.resubmitRecon = function (id) {
            if (!confirm(`确认已针对客户反馈的问题进行了修正，并重新发送给客户确认吗？`)) return;

            let recons = JSON.parse(sessionStorage.getItem('CustomerRecons') || "[]");
            let item = recons.find(r => r.id === id);

            if (item) {
                item.status = '待客户确认';
                item.rejectReason = ''; // 清空驳回原因
                sessionStorage.setItem('CustomerRecons', JSON.stringify(recons));

                alert("✅ 已重新提交！等待客户再次确认。");
                loadContent('ReconCustomer');
            }
        }


        /** 跳转到核销页面 (并传递要核销的单号) */
        window.goToVerify = function (billId) {
            // 1. 把要核销的单号存起来，方便下一个页面自动填入
            sessionStorage.setItem('TargetVerifyBill', billId);

            // 2. 跳转
            alert(`准备对【${billId}】进行收款核销，正在跳转...`);
            loadContent('ARCollectionVerify');
        }


        /** * [终极闭环] 执行收款核销 
         * 1. 更新应收账款状态 -> 已核销
         * 2. 自动生成收款凭证
         */
        window.executeVerify = function (arId, amountStr, client) {
            // 1. 模拟输入实收金额 (默认全额)
            const inputAmount = prompt(`正在核销单据【${arId}】\n\n应收金额：${amountStr}\n请输入本次实收金额：`, amountStr);
            if (!inputAmount) return;

            // 2. 更新应收列表状态
            let arList = JSON.parse(sessionStorage.getItem('ARStatements') || "[]");
            let item = arList.find(i => i.id === arId);

            if (item) {
                item.status = '已核销';
                item.verified = inputAmount;
                item.unverified = '0.00';
                sessionStorage.setItem('ARStatements', JSON.stringify(arList));


                // ★★★ 修改：调用会计引擎生成凭证 (替代原来的手写逻辑) ★★★
                const vId = runAccountingEngine('收款核销', { client: client, amount: inputAmount });

                // 移除 TargetVerifyBill ... 

                alert(`🎉 核销成功！\n自动生成收款凭证：${vId}`);
                loadContent('ARCollectionVerify');
            }

            // 3. ★★★ 自动生成收款凭证 (Auto Voucher) ★★★
            const vId = "收" + new Date().getFullYear() + Math.floor(Math.random() * 10000);
            const newVoucher = {
                id: vId,
                date: new Date().toISOString().split('T')[0],
                amount: inputAmount,
                user: '系统自动',
                status: '已记账', // 核销生成的凭证直接记账
                lines: [
                    { summary: `收 ${client} 运费/对账款`, account: '1002 银行存款', debit: inputAmount, credit: '' },
                    { summary: `核销 ${arId}`, account: '1122 应收账款', debit: '', credit: inputAmount }
                ]
            };

            // 存入凭证库
            let vList = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
            vList.unshift(newVoucher);
            sessionStorage.setItem('ManualVouchers', JSON.stringify(vList));

            // 4. 清理选中状态并刷新
            sessionStorage.removeItem('TargetVerifyBill');

            // 5. 成功提示
            alert(`🎉 核销成功！\n\n1. 应收账款已结清。\n2. 已自动生成收款凭证【${vId}】。\n3. 资金已进入银行存款科目。`);

            loadContent('ARCollectionVerify');
        }

