// js/core/accounting_engine.js

// 1. 定义全局分录模板
const GLOBAL_TEMPLATES = [
    {
        id: 'TPL_REV_CONFIRM',
        voucherWord: '记',
        trigger: '对账单确认',
        entries: [
            { dir: '借', subject: '1122 应收账款', valType: 'total' }, 
            { dir: '贷', subject: '6001 主营业务收入', valType: 'noTax' },
            { dir: '贷', subject: '2221 应交税费-待转销项税额', valType: 'tax' }
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

// 2. 会计引擎执行函数
window.runAccountingEngine = function(triggerName, context) {
    console.log(`[会计引擎] 启动: ${triggerName}, 金额: ${context.amount}`);

    const tpl = GLOBAL_TEMPLATES.find(t => t.trigger === triggerName);
    if (!tpl) return null;

    // 计算金额 (9% 税率)
    const total = parseFloat(context.amount.toString().replace(/,/g, ''));
    const noTax = total / 1.09;
    const tax = total - noTax;

    const lines = tpl.entries.map(rule => {
        let val = 0;
        if (rule.valType === 'total') val = total;
        if (rule.valType === 'noTax') val = noTax;
        if (rule.valType === 'tax')   val = tax;

        return {
            summary: `${triggerName} - ${context.client}`,
            account: rule.subject,
            debit: rule.dir === '借' ? val.toFixed(2) : '',
            credit: rule.dir === '贷' ? val.toFixed(2) : ''
        };
    });

    const newVoucher = {
        id: tpl.voucherWord + new Date().getFullYear() + Math.floor(Math.random()*10000 + 1000),
        date: new Date().toISOString().split('T')[0],
        amount: (lines[0].debit || lines[0].credit), 
        user: '会计引擎(自动)',
        status: '已记账',
        lines: lines
    };

    let vList = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
    vList.unshift(newVoucher);
    sessionStorage.setItem('ManualVouchers', JSON.stringify(vList));

    return newVoucher.id;
}


        // ==========================================================
        // 会计科目管理 - 业务逻辑
        // ==========================================================

        /**
         * 1. 新增科目 (支持添加子级)
         */
        window.addSubject = function () {
            // 1. 收集信息
            const parentCode = prompt("请输入上级科目编码 (留空则创建一级科目)：\n例如输入 '1002' 可创建 '1002xx' 级科目");

            let newCode = "";
            let type = "资产"; // 默认
            let direction = "借"; // 默认

            // 读取现有数据
            let list = JSON.parse(sessionStorage.getItem('AcctSubjects') || "[]");

            if (parentCode) {
                // 如果有上级，查找上级信息以继承属性
                const parent = list.find(s => s.code === parentCode);
                if (!parent) return alert("❌ 未找到上级科目：" + parentCode);

                // 简单的编码生成逻辑：父级 + 01, 02...
                // 实际需检查是否存在，这里简化为随机数模拟
                newCode = parentCode + Math.floor(Math.random() * 90 + 10);
                type = parent.type; // 继承类型
                direction = parent.direction; // 继承方向
            } else {
                newCode = prompt("请输入新的一级科目编码 (4位)：", "1003");
                if (!newCode) return;
            }

            const name = prompt(`正在创建科目 [${newCode}]\n请输入科目名称：`);
            if (!name) return;

            const remark = prompt("请输入备注：", "");

            // 2. 构造新科目
            const newSubject = {
                code: newCode,
                name: name,
                type: type,
                aux: "无", // 默认
                direction: direction,
                status: "启用",
                remark: remark
            };

            // 3. 保存并刷新
            list.push(newSubject);
            sessionStorage.setItem('AcctSubjects', JSON.stringify(list));

            // 记日志
            if (typeof addDataChangeLog === 'function') {
                addDataChangeLog({
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    object: '会计科目',
                    objId: newCode,
                    field: '新增',
                    oldVal: '-',
                    newVal: name
                });
            }

            alert("✅ 科目新增成功！");
            loadContent('AcctSubject');
        }

        /**
         * 2. 编辑科目
         */
        window.editSubject = function (code) {
            let list = JSON.parse(sessionStorage.getItem('AcctSubjects') || "[]");
            const subject = list.find(s => s.code === code);
            if (!subject) return;

            // 依次修改名称、方向、备注
            const newName = prompt(`修改科目 [${code}] 名称：`, subject.name);
            if (newName !== null) subject.name = newName;

            const newDir = prompt(`修改余额方向 (借/贷)：`, subject.direction);
            if (newDir !== null && (newDir === '借' || newDir === '贷')) subject.direction = newDir;

            const newRemark = prompt(`修改备注：`, subject.remark);
            if (newRemark !== null) subject.remark = newRemark;

            // 保存
            sessionStorage.setItem('AcctSubjects', JSON.stringify(list));

            // 记日志
            if (typeof addDataChangeLog === 'function') {
                addDataChangeLog({
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    object: '会计科目',
                    objId: code,
                    field: '属性修改',
                    oldVal: '...',
                    newVal: `${newName} / ${newDir}`
                });
            }

            loadContent('AcctSubject');
        }

        /**
         * 3. 启用/停用切换
         */
        window.toggleSubjectStatus = function (code) {
            let list = JSON.parse(sessionStorage.getItem('AcctSubjects') || "[]");
            const subject = list.find(s => s.code === code);
            if (!subject) return;

            if (!confirm(`确认${subject.status === '启用' ? '停用' : '启用'}科目【${subject.name}】吗？`)) return;

            subject.status = subject.status === '启用' ? '停用' : '启用';
            sessionStorage.setItem('AcctSubjects', JSON.stringify(list));
            loadContent('AcctSubject');
        }


                // ==========================================================
        // 1. 新增客户 (修复版：补全字段 + 保存到 Session)
        // ==========================================================
        window.addCustomer = function () {
            // 1. 收集信息 (补全了纳税号和账期)
            const name = prompt("请输入客户名称：", "新客户公司");
            if (!name) return;

            const taxId = prompt("请输入纳税人识别号：", "91310000..."); // 新增
            const type = prompt("请输入结算方式 (月结/现结)：", "月结");
            const limit = prompt("请输入信用额度 (RMB)：", "50000.00");
            const days = prompt("请输入账期 (天)：", "30"); // 新增

            // 2. 构造数据对象
            const newId = "CUST-" + Math.floor(Math.random() * 9000 + 1000);
            const newCustomerObj = {
                id: newId,
                name: name,
                taxId: taxId || "-", // 如果没填显示 -
                type: type,
                limit: parseFloat(limit).toFixed(2),
                days: days || "0",
                status: "正常"
            };

            // 3. ★★★ 保存到 Session (持久化) ★★★
            // 读取已有列表 -> 追加新项 -> 存回去
            let addedList = JSON.parse(sessionStorage.getItem('AddedCustomers') || "[]");
            addedList.unshift(newCustomerObj); // 加到最前面
            sessionStorage.setItem('AddedCustomers', JSON.stringify(addedList));

            // 4. 记录审计日志 (保持不变)
            if (typeof addDataChangeLog === 'function') {
                addDataChangeLog({
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    object: '客户档案',
                    objId: newId,
                    field: '新建记录',
                    oldVal: '-',
                    newVal: `名称:${name}, 税号:${taxId}, 账期:${days}天`
                });
            }

            alert(`✅ 客户【${name}】创建成功！\n已保存到系统。`);

            // 5. 刷新当前页面 (让 loadContent 重新读取数据并渲染)
            loadContent('BaseCustomer');
        }

                // ==========================================================
        // 3. 修改客户资料 (修复版：支持修改 结算方式/额度/账期)
        // ==========================================================
        window.editCustomerInfo = function (btn, id) {
            const row = btn.closest('tr');
            const name = row.querySelector('.val-name').innerText;

            // 1. 获取当前界面上的旧值 (根据列的索引位置)
            // 第4列(index 3): 结算方式 (里面包了span)
            const typeCell = row.cells[3];
            const oldType = typeCell.innerText.trim();

            // 第5列(index 4): 信用额度 (里面包了strong)
            const limitCell = row.cells[4];
            const oldLimit = limitCell.innerText.replace(/,/g, '').trim();

            // 第6列(index 5): 账期
            const daysCell = row.cells[5];
            const oldDays = daysCell.innerText.trim();

            // 2. 依次弹出输入框 (用户点击取消则保留原值)
            const newType = prompt(`正在修改【${name}】\n\n1/3 请输入结算方式 (月结/现结)：`, oldType);
            if (newType === null) return; // 如果点击取消，则终止后续操作

            const newLimit = prompt(`正在修改【${name}】\n\n2/3 请输入信用额度 (RMB)：`, oldLimit);
            if (newLimit === null) return;

            const newDays = prompt(`正在修改【${name}】\n\n3/3 请输入账期 (天数)：`, oldDays);
            if (newDays === null) return;

            // 3. 变更检测与更新 (哪个变了改哪个，并记日志)
            let hasChange = false;

            // --- A. 处理结算方式变更 ---
            if (newType && newType !== oldType) {
                const badgeStyle = newType === '现结'
                    ? 'background:#f6ffed; color:#52c41a;'
                    : 'background:#e6f7ff; color:#1890ff;';

                typeCell.innerHTML = `<span style="${badgeStyle} padding:2px 6px; border-radius:4px; font-size:12px;">${newType}</span>`;

                // 写入日志
                _recordChange(id, '结算方式', oldType, newType);
                hasChange = true;
            }

            // --- B. 处理信用额度变更 ---
            if (newLimit && parseFloat(newLimit) !== parseFloat(oldLimit)) {
                limitCell.innerHTML = `<strong style="color:#e74c3c">${parseFloat(newLimit).toFixed(2)}</strong>`;

                // 写入日志
                _recordChange(id, '信用额度', parseFloat(oldLimit).toFixed(2), parseFloat(newLimit).toFixed(2));
                hasChange = true;
            }

            // --- C. 处理账期变更 ---
            if (newDays && newDays !== oldDays) {
                daysCell.innerText = newDays;
                daysCell.style.color = "#e74c3c"; // 变红提示
                daysCell.style.fontWeight = "bold";

                // 写入日志
                _recordChange(id, '账期(天)', oldDays, newDays);
                hasChange = true;
            }

            // 4. 完成提示
            if (hasChange) {
                alert(`✅ 客户【${name}】资料修改成功！\n变更项已逐条记录到审计模块。`);
            } else {
                alert("⚠️ 未检测到数据变更。");
            }
        }


                /**
         * 2. 冻结/解冻客户 (Freeze/Unfreeze)
         */
        window.toggleFreeze = function (btn, id, name) {
            const row = btn.closest('tr');
            const statusCell = row.cells[6]; // 状态列
            const isFrozen = btn.innerText === '申请解冻';

            const action = isFrozen ? "解冻" : "冻结";
            const confirmMsg = isFrozen
                ? `⚠️ 确认要申请解冻客户【${name}】吗？\n需要风控审批。`
                : `⚠️ 警告：确认要冻结客户【${name}】吗？\n冻结后该客户将无法下单和开票。`;

            if (!confirm(confirmMsg)) return;

            // 1. 更新界面状态
            if (isFrozen) {
                // 执行解冻
                statusCell.innerHTML = '<span style="color: #27ae60;">正常</span>';
                btn.innerText = "冻结";
                btn.style.color = "#e74c3c";
                row.style.backgroundColor = "#fff";
                alert(`✅ 申请已提交！\n\n客户【${name}】状态已恢复正常。`);
            } else {
                // 执行冻结
                statusCell.innerHTML = '<span style="color: #e74c3c; font-weight:bold;">已冻结</span>';
                btn.innerText = "申请解冻";
                btn.style.color = "#3498db";
                row.style.backgroundColor = "#fff1f0"; // 变红背景
                alert(`⛔ 客户【${name}】已冻结！\n业务权限已暂停。`);
            }

            // 2. ★★★ 记录[数据变更明细] (状态变更) ★★★
            if (typeof addDataChangeLog === 'function') {
                addDataChangeLog({
                    time: new Date().toLocaleString(),
                    user: '当前用户',
                    object: '客户档案',
                    objId: id,
                    field: '客户状态',
                    oldVal: isFrozen ? '已冻结' : '正常',
                    newVal: isFrozen ? '正常' : '已冻结'
                });
            }
        }
