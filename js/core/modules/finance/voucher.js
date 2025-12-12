        // ==========================================================
        // 凭证录入与审核 - 业务逻辑函数
        // ==========================================================

        /** 1. 自动计算合计金额 */
        window.calculateTotals = function () {
            let totalDebit = 0;
            let totalCredit = 0;

            document.querySelectorAll('.input-debit').forEach(input => {
                const val = parseFloat(input.value);
                if (!isNaN(val)) totalDebit += val;
            });

            document.querySelectorAll('.input-credit').forEach(input => {
                const val = parseFloat(input.value);
                if (!isNaN(val)) totalCredit += val;
            });

            const dEl = document.getElementById('total-debit-display');
            const cEl = document.getElementById('total-credit-display');

            if (dEl && cEl) {
                dEl.innerText = totalDebit.toFixed(2);
                cEl.innerText = totalCredit.toFixed(2);

                const isBalanced = totalDebit.toFixed(2) === totalCredit.toFixed(2) && totalDebit > 0;
                const color = isBalanced ? "#27ae60" : "#e74c3c";
                dEl.style.color = color;
                cEl.style.color = color;
            }
        }

        /** 2. 动态添加分录行 (支持回填参数) */
        window.addEntryRow = function (data = null) {
            const tbody = document.getElementById('entry-table-body');
            if (!tbody) return;

            // 读取传入的 data 对象
            const summary = data ? data.summary : '';
            const account = data ? data.account : '';
            const debit = data ? data.debit : '';
            const credit = data ? data.credit : '';

            const newRow = `
            <tr>
                <td>
                    <div style="display:flex; align-items:center;">
                        <a href="javascript:void(0)" onclick="removeEntryRow(this)" style="color:#ccc; margin-right:5px; text-decoration:none; font-size:16px;">✕</a>
                        <input type="text" class="input-summary" value="${summary}" placeholder="摘要" style="width: 90%;">
                    </div>
                </td>
                <td><input type="text" class="input-account" value="${account}" list="acct-list" placeholder="科目" style="width: 95%;"></td>
                <td><input type="number" class="input-debit" value="${debit}" oninput="calculateTotals()" placeholder="0.00" style="width: 95%; text-align: right;"></td>
                <td><input type="number" class="input-credit" value="${credit}" oninput="calculateTotals()" placeholder="0.00" style="width: 95%; text-align: right;"></td>
            </tr>
        `;
            tbody.insertAdjacentHTML('beforeend', newRow);
        }

        /** 3. 删除行 */
        window.removeEntryRow = function (btn) {
            const row = btn.closest('tr');
            const tbody = document.getElementById('entry-table-body');
            if (tbody.rows.length > 1) {
                row.remove();
                calculateTotals();
            } else {
                alert("至少保留一行。");
            }
        }

        /** 4. 重置表单 (新建模式) */
        window.resetVoucherForm = function () {
            const tbody = document.getElementById('entry-table-body');
            if (!tbody) return;
            tbody.innerHTML = '';

            addEntryRow();
            addEntryRow();

            const newId = `记${new Date().getFullYear()}11${Math.floor(Math.random() * 1000 + 1000)}`;
            document.getElementById('current-v-id').innerText = newId;
            document.getElementById('v-date').value = new Date().toISOString().split('T')[0];

            calculateTotals();
        }

        /** * 5.  保存/提交凭证 (含引擎校验 + 修复重复ID问题) */
        window.saveVoucher = function (status) {
            // --- 1. 引擎校验  ---
            const mappings = JSON.parse(sessionStorage.getItem('EngineMappings') || "[]");
            // 如果没有启用的规则，拦截 (模拟强管控)
            if (!mappings.some(m => m.status === '启用')) return alert("⛔ 【拦截】会计引擎已关闭，禁止录入！");

            // --- 2. 获取数据 ---
            // ★★★ 核心修复：加 trim() 去除可能的空格 ★★★
            const vId = document.getElementById('current-v-id').innerText.trim();
            const vDate = document.getElementById('v-date').value;

            const lines = [];
            const rows = document.querySelectorAll('#entry-table-body tr');
            let totalDebit = 0;
            let totalCredit = 0;

            rows.forEach(row => {
                const summary = row.querySelector('.input-summary').value;
                const account = row.querySelector('.input-account').value;
                const debit = parseFloat(row.querySelector('.input-debit').value) || 0;
                const credit = parseFloat(row.querySelector('.input-credit').value) || 0;

                // 跳过空行
                if (!summary && !account && debit === 0 && credit === 0) return;

                totalDebit += debit;
                totalCredit += credit;

                lines.push({
                    summary: summary,
                    account: account,
                    debit: debit === 0 ? '' : debit.toFixed(2),
                    credit: credit === 0 ? '' : credit.toFixed(2)
                });
            });

            // 校验借贷平衡
            if (totalDebit === 0 || Math.abs(totalDebit - totalCredit) > 0.01) {
                alert("❌ 借贷不平衡或金额为0，无法保存！");
                return;
            }

            // 构造新凭证对象
            const newVoucher = {
                id: vId,
                date: vDate,
                amount: totalDebit.toFixed(2),
                user: '当前用户',
                status: status, // '草稿' 或 '待审核'
                lines: lines
            };

            // --- 3. 存入 Session (修复覆盖逻辑) ---
            let list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");

            // ★★★ 核心修复：查找旧数据索引，原地替换或置顶 ★★★
            const existingIndex = list.findIndex(v => v.id === vId);

            if (existingIndex > -1) {
                // 找到了旧的：删除旧的，把新的放最前面 (方便用户看到变化)
                list.splice(existingIndex, 1);
                list.unshift(newVoucher);
            } else {
                // 没找到：直接新增
                list.unshift(newVoucher);
            }

            sessionStorage.setItem('ManualVouchers', JSON.stringify(list));

            // --- 4. 记日志 ---
            if (typeof addAuditLog === 'function') {
                addAuditLog({
                    level: '中风险',
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    ip: '127.0.0.1',
                    module: '凭证录入',
                    action: status === '草稿' ? '保存/修改草稿' : '提交审核',
                    detail: `凭证:${vId}, 状态:${status}, 金额:${totalDebit.toFixed(2)}`
                });
            }

            alert(`✅ 凭证【${vId}】已保存！\n当前状态：${status}`);
            loadContent('VoucherEntryReview'); // 刷新页面
        }


        /** 6.  编辑凭证 (真实回填数据) */
        window.editVoucher = function (id) {
            // 1. 读取数据
            const list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
            const voucher = list.find(v => v.id === id);

            if (!voucher) {
                alert("❌ 未找到该凭证数据。");
                return;
            }

            // 状态校验
            if (voucher.status === '已审核' || voucher.status === '已记账') {
                alert("⚠️ 已审核的凭证不可修改。");
                return;
            }

            // 2. 回填表头
            const idEl = document.getElementById('current-v-id');
            const dateEl = document.getElementById('v-date');

            if (idEl) idEl.innerText = voucher.id;
            if (dateEl) dateEl.value = voucher.date;

            // 3. 回填分录行 (关键)
            const tbody = document.getElementById('entry-table-body');
            if (tbody) {
                tbody.innerHTML = ''; // 先清空

                if (voucher.lines && voucher.lines.length > 0) {
                    // 逐行回填
                    voucher.lines.forEach(line => {
                        addEntryRow(line);
                    });
                } else {
                    // 兼容旧数据
                    addEntryRow({ summary: '数据恢复', account: '待确认科目', debit: voucher.amount, credit: '' });
                    addEntryRow({ summary: '数据恢复', account: '1002 银行存款', debit: '', credit: voucher.amount });
                }
            }

            // 4. 重新计算合计 & 滚回顶部
            calculateTotals();
            const contentArea = document.getElementById('content-area');
            if (contentArea) contentArea.scrollTop = 0;
        }

        /** 7. 删除凭证 */
        window.deleteVoucher = function (btn, id) {
            if (!confirm(`确认删除凭证【${id}】吗？`)) return;

            let list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
            list = list.filter(v => v.id !== id);
            sessionStorage.setItem('ManualVouchers', JSON.stringify(list));

            btn.closest('tr').remove();
        }


        /**
         * 2. 审核凭证 (Change Status)
         */
        window.auditVoucher = function (btn, id) {
            if (!confirm(`确认审核通过凭证【${id}】吗？\n审核后凭证将生效并可查询。`)) return;

            // 1. 读取数据
            let voucherList = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");

            // 2. 找到对应凭证并修改状态
            const target = voucherList.find(v => v.id === id);
            if (target) {
                target.status = "已审核"; // 或者 "已记账"

                // 3. 保存回 Session
                sessionStorage.setItem('ManualVouchers', JSON.stringify(voucherList));

                // 4. 刷新页面
                alert("✅ 审核通过！");
                loadContent('VoucherEntryReview');
            }
        }

        // 会计：审核通过
        window.auditPass = function (id) {
            if (!confirm(`确认审核通过凭证【${id}】吗？`)) return;

            // 更新 Session 数据
            let list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
            const target = list.find(v => v.id === id);
            if (target) target.status = "已记账";
            sessionStorage.setItem('ManualVouchers', JSON.stringify(list));

            alert("✅ 审核通过！凭证已正式记账。");
            loadContent('VoucherQueryPrint'); // 刷新
        }

        // 会计：驳回
        window.auditReject = function (id) {
            const reason = prompt(`请输入驳回凭证【${id}】的原因：`, "金额有误，请核对");
            if (reason) {
                // 更新 Session 数据
                let list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
                const target = list.find(v => v.id === id);
                if (target) target.status = "已驳回";
                sessionStorage.setItem('ManualVouchers', JSON.stringify(list));

                alert(`⛔ 凭证已驳回给制单人。\n原因：${reason}`);
                loadContent('VoucherQueryPrint'); // 刷新
            }
        }


        // ==========================================================
// ★★★ 智能凭证录入逻辑 (Smart Entry) ★★★
// ==========================================================

/**
 * 核心：更新右侧预览 (响应式)
 */
window.updateSmartPreview = function() {
    // 1. 获取左侧表单数据
    const scenarioEl = document.getElementById('biz-scenario');
    const summaryInput = document.getElementById('biz-summary').value.trim();
    const amountVal = parseFloat(document.getElementById('biz-amount').value) || 0;
    const accountEl = document.getElementById('settlement-account');

    if (!scenarioEl || !accountEl) return;

    // 2. 获取选中项的 dataset 属性
    const selectedBiz = scenarioEl.options[scenarioEl.selectedIndex];
    const selectedAcct = accountEl.options[accountEl.selectedIndex];

    // 业务侧科目信息
    const bizSubject = selectedBiz.getAttribute('data-subject'); // 例如 "6001 主营业务收入"
    const bizDefaultDir = selectedBiz.getAttribute('data-dir');  // "debit" 或 "credit"

    // 资金侧科目信息
    const fundSubject = selectedAcct.getAttribute('data-subject'); // 例如 "100201 银行存款"
    const fundType = selectedAcct.getAttribute('data-type');       // "money" 或 "transfer"

    // 3. 生成动态摘要
    // 逻辑：如果没填摘要，就用场景名；填了就拼接
    const bizName = selectedBiz.text; 
    const finalSummary = summaryInput ? `${bizName}-${summaryInput}` : bizName;

    // 4. 判定凭证类型 (核心逻辑)
    let voucherType = "转账凭证";
    // 逻辑：如果是资金类科目
    if (fundType === 'money') {
        // 如果业务是“借”，那钱就是“贷”（付出去），所以是付款凭证
        // 如果业务是“贷”，那钱就是“借”（收进来），所以是收款凭证
        if (bizDefaultDir === 'credit') {
            voucherType = "收款凭证"; // 业务在贷方(收入)，资金在借方(收钱)
        } else {
            voucherType = "付款凭证"; // 业务在借方(费用)，资金在贷方(付钱)
        }
    }

    // 5. 构造分录行 (Lines)
    let lines = [];
    const amtStr = amountVal.toFixed(2);

    if (bizDefaultDir === 'credit') {
        // 场景：收入 (贷方) -> 资金在借方
        lines.push({ summary: finalSummary, account: fundSubject, debit: amtStr, credit: '' });
        lines.push({ summary: finalSummary, account: bizSubject, debit: '', credit: amtStr });
    } else {
        // 场景：费用 (借方) -> 资金在贷方
        lines.push({ summary: finalSummary, account: bizSubject, debit: amtStr, credit: '' });
        lines.push({ summary: finalSummary, account: fundSubject, debit: '', credit: amtStr });
    }

    // 6. 渲染右侧预览 HTML
    const tbody = document.getElementById('preview-tbody');
    const tag = document.getElementById('preview-tag');
    const totalD = document.getElementById('preview-total-debit');
    const totalC = document.getElementById('preview-total-credit');

  // ... (接 updateSmartPreview 函数内部)

    // 7. ★★★ 修改建议：默认值改为 '转'，实现标准的三分法 ★★★
    
    let prefixWord = '转'; // ❌ 不要用 '记'，直接默认为 '转'
    
    // 根据类型覆盖字号
    if (voucherType === '收款凭证') {
        prefixWord = '收';
    } else if (voucherType === '付款凭证') {
        prefixWord = '付';
    } 
    // else { prefixWord 保持为 '转' }

    const idEl = document.getElementById('current-v-id');
    if (idEl) {
        // 获取当前显示的单号数字部分
        const currentText = idEl.innerText; 
        // 这里的正则要稍微改一下，以防之前显示的是“记”
        // 逻辑：不管之前是啥字，只取后面的数字
        const numberPart = currentText.replace(/^[\u4e00-\u9fa5]/, ''); 
        
        // 拼接新单号
        idEl.innerText = prefixWord + numberPart;
    }

    // 更新暂存数据
    window._tempSmartVoucher = {
        amount: amtStr,
        lines: lines,
        type: voucherType,
        word: prefixWord
    };


    // 更新标签颜色和文字
    tag.innerText = voucherType;
    if (voucherType === '收款凭证') tag.style.background = '#e67e22'; // 橙色
    else if (voucherType === '付款凭证') tag.style.background = '#2980b9'; // 蓝色
    else tag.style.background = '#7f8c8d'; // 灰色

    // 更新表格行
    let rowsHtml = '';
    lines.forEach(line => {
        rowsHtml += `
            <tr>
                <td style="border:1px solid #eee; padding:5px;">${line.summary}</td>
                <td style="border:1px solid #eee; padding:5px;">${line.account}</td>
                <td style="border:1px solid #eee; padding:5px; text-align:right;">${line.debit}</td>
                <td style="border:1px solid #eee; padding:5px; text-align:right;">${line.credit}</td>
            </tr>
        `;
    });
    tbody.innerHTML = rowsHtml;

    // 更新合计
    totalD.innerText = amtStr;
    totalC.innerText = amtStr;

    // 暂存当前计算结果供保存使用
    window._tempSmartVoucher = {
        amount: amtStr,
        lines: lines,
        type: voucherType
    };
}

/**
 * 保存智能凭证
 */
window.saveSmartVoucher = function() {
    const data = window._tempSmartVoucher;
    
    // 校验
    if (!data || parseFloat(data.amount) <= 0) {
        alert("❌ 请输入有效的金额！");
        return;
    }

    const vId = document.getElementById('current-v-id').innerText;
    const vDate = new Date().toISOString().split('T')[0];

    const newVoucher = {
        id: vId,
        date: vDate,
        amount: data.amount,
        user: '当前用户',
        status: '已审核', // 智能录入通常直接生效，或设为“待审核”
        type: data.type,  // 保存自动推导的类型
        lines: data.lines
    };

    // 保存到 Session
    let list = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
    list.unshift(newVoucher);
    sessionStorage.setItem('ManualVouchers', JSON.stringify(list));

    // 记日志
    if (typeof addAuditLog === 'function') {
        addAuditLog({
            level: '低风险', time: new Date().toLocaleString(), user: '当前用户', 
            module: '智能凭证', action: '新增凭证', detail: `${vId} (${data.type})`
        });
    }

    alert(`✅ 凭证保存成功！\n\n凭证号：${vId}\n类型：${data.type}`);
    loadContent('VoucherEntryReview'); // 刷新页面重置
}

/**
 * 重置表单
 */
window.resetSmartForm = function() {
    loadContent('VoucherEntryReview');
}