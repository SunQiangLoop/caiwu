// js/modules/finance/settlement.js

// 全选/反选
window.toggleAll = function (source) {
    document.querySelectorAll('.wb-check').forEach(cb => {
        if (!cb.disabled) cb.checked = source.checked;
    });
}

// 运单结算逻辑
window.settleWaybill = function (id) {
    let list = JSON.parse(sessionStorage.getItem('BizWaybills'));
    let item = list.find(i => i.id === id);
    if (item) {
        item.status = '已结算';
        // ★★★ 修复 1：读取 totalAmount，如果没有则默认 1000 ★★★
        let currentVal = item.totalAmount || item.amount || "1000";
        item.totalAmount = parseFloat(currentVal.toString().replace(/,/g, '')).toFixed(2);
        
        sessionStorage.setItem('BizWaybills', JSON.stringify(list));
        alert("✅ 费用计算完成！状态已更新为【已结算】。");
        loadContent('SettlementWaybill');
    }
}

/** 1. 处理异常退款 (生成负数单据) */
window.handlePartRefund = function (id) {
    let list = JSON.parse(sessionStorage.getItem('BizWaybills'));
    let item = list.find(i => i.id === id);
    if (!item) return;

    // ★★★ 修复 2：获取当前金额使用 totalAmount ★★★
    const currentAmt = item.totalAmount || item.amount || "0";
    
    // 模拟输入退款金额
    const refundAmountStr = prompt(`当前运单【${id}】金额：${currentAmt}\n请输入退款金额 (例如退运费400)：`, "400");
    if (!refundAmountStr) return;

    const refundAmount = parseFloat(refundAmountStr);
    if (isNaN(refundAmount) || refundAmount <= 0) return alert("金额无效");

    if (!confirm(`确认退款 ${refundAmount} 元吗？\n系统将生成一条负数结算单。`)) return;

    // 生成红字调整单
    const refundBill = {
        id: id + '-退', // 关联原单号
        client: item.client,
        date: new Date().toISOString().split('T')[0],
        route: item.route, // 补全字段防止显示空
        goods: "退款抵扣",  // 补全字段
        weight: "-",
        totalAmount: '-' + refundAmount.toFixed(2), // ★★★ 修复 3：统一使用 totalAmount ★★★
        status: '已结算', 
        details: { '退款说明': '异常退运费' }
    };

    // 插入到原单后面
    const idx = list.findIndex(i => i.id === id);
    list.splice(idx + 1, 0, refundBill);

    sessionStorage.setItem('BizWaybills', JSON.stringify(list));
    alert("✅ 退款单已生成！\n状态为【已结算】，下次生成对账单时将自动抵扣。");
    loadContent('SettlementWaybill');
}

// 2. 编辑运单 (模拟)
window.editWaybill = function (id) {
    let list = JSON.parse(sessionStorage.getItem('BizWaybills'));
    let item = list.find(i => i.id === id);
    if (!item) return;

    // ★★★ 修复 4：统一使用 totalAmount ★★★
    const currentAmt = item.totalAmount || item.amount || "0";

    const newAmount = prompt(`编辑运单【${id}】\n\n当前金额：${currentAmt}\n请输入修正后的金额：`, currentAmt);
    if (newAmount && newAmount !== currentAmt) {
        item.totalAmount = parseFloat(newAmount).toFixed(2); // 更新 totalAmount
        // 如果改了金额，状态重置为待结算，需要重新确认
        item.status = '待结算';
        sessionStorage.setItem('BizWaybills', JSON.stringify(list));
        alert("✅ 修改成功！状态已重置为【待结算】，请重新确认费用。");
        loadContent('SettlementWaybill');
    }
}

// 1. [核心] 批量生成对账单 (按客户合并)
window.createReconBill = function () {
    // 获取所有被勾选的运单
    const checkedBoxes = document.querySelectorAll('.wb-check:checked');
    if (checkedBoxes.length === 0) return alert("⚠️ 请至少勾选一笔【已结算】的运单！");

    let ids = [];
    let clientName = "";
    let totalAmount = 0;
    let isSameClient = true;

    // 校验：必须是同一个客户才能合并
    checkedBoxes.forEach((cb, index) => {
        const rowClient = cb.getAttribute('data-client');
        if (index === 0) {
            clientName = rowClient; // 以第一个为准
        } else {
            if (clientName !== rowClient) isSameClient = false;
        }
        ids.push(cb.value);
    });

    if (!isSameClient) {
        return alert("❌ 生成失败！\n\n勾选了多个不同客户的运单，无法合并成一张对账单。\n请只勾选【" + clientName + "】的运单。");
    }

    if (!confirm(`确认将选中的 ${ids.length} 笔运单合并生成【${clientName}】的对账单吗？`)) return;

    // 开始处理数据
    let list = JSON.parse(sessionStorage.getItem('BizWaybills') || "[]");
    const newReconId = 'DZ' + new Date().getFullYear() + Math.floor(Math.random() * 1000);

    // 更新运单状态并计算总额
    list.forEach(i => {
        if (ids.includes(i.id)) {
            i.status = '对账中';
            i.reconId = newReconId; // 关联对账单号
            
            // ★★★ 核心修复点：这里是报错的地方 ★★★
            // 优先取 totalAmount，没有则取 amount，再没有取 "0"
            // 并强制转为字符串，防止 .replace 报错
            const valStr = (i.totalAmount || i.amount || "0").toString();
            totalAmount += parseFloat(valStr.replace(/,/g, ''));
        }
    });
    sessionStorage.setItem('BizWaybills', JSON.stringify(list));

    // 生成对账单
    let recons = JSON.parse(sessionStorage.getItem('CustomerRecons') || "[]");
    recons.unshift({
        id: newReconId,
        client: clientName,
        period: '2025-11', // 简单模拟
        amount: totalAmount.toFixed(2),
        status: '待客户确认',
        waybillCount: ids.length
    });
    sessionStorage.setItem('CustomerRecons', JSON.stringify(recons));

    alert(`✅ 合并成功！\n\n对账单号：${newReconId}\n客户：${clientName}\n总金额：${totalAmount.toFixed(2)}`);
    loadContent('ReconCustomer'); // 跳转去查看
}

// =======================================================
// 干线结算 <-> 应付管理 (更新版：一口价逻辑)
// =======================================================

// 1. [正向] 结算：推送到应付管理
window.sendToAP = function(id) {
    let trunkList = JSON.parse(sessionStorage.getItem('TrunkBatches'));
    let item = trunkList.find(i => i.id === id);
    if (!item) return;

    // 直接取总金额
    const amountToPay = item.totalAmount;

    if(!confirm(`确认结算批次【${id}】吗？\n\n支付方式：${item.paymentType}\n应付金额：${amountToPay.toLocaleString()}\n\n结算后将推送到【应付管理】。`)) return;

    // A. 修改自身状态
    item.settlementStatus = "已结算";
    item.paidAmount = amountToPay; // 标记为已付
    
    sessionStorage.setItem('TrunkBatches', JSON.stringify(trunkList));

    // B. 推送到应付模块
    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");
    apList.unshift({
        apId: "AP" + new Date().getTime().toString().slice(-6),
        sourceId: item.id,
        payee: `${item.driver} (${item.plate})`,
        amount: amountToPay,
        applyDate: new Date().toISOString().split('T')[0],
        status: "待付款"
    });
    sessionStorage.setItem('APApplications', JSON.stringify(apList));

    alert("✅ 结算成功！已转入应付管理。");
    loadContent('SettlementTrunk'); 
}

// =======================================================
// 文件路径: js/core/modules/finance/settlement.js
// 描述: 结算管理核心逻辑 (含干线、应付、运单)
// =======================================================

// 通用：全选/反选
window.toggleAll = function (source) {
    document.querySelectorAll('.wb-check').forEach(cb => {
        if (!cb.disabled) cb.checked = source.checked;
    });
}

// =======================================================
// 1. 干线批次结算相关 (SettlementTrunk)
// =======================================================

/** 跳转到干线详情页 */
window.viewTrunkDetail = function(id) {
    // 1. 设置全局变量，告诉详情页要显示哪条数据
    window.g_currentTrunkId = id; 
    // 2. 跳转页面
    loadContent('SettlementTrunkDetail');
}

/** 结算：推送到应付管理 */
window.sendToAP = function(id) {
    let trunkList = JSON.parse(sessionStorage.getItem('TrunkBatches'));
    let item = trunkList.find(i => i.id === id);
    if (!item) return;

    // 确认框
    const amountToPay = item.totalAmount;
    if(!confirm(`确认结算批次【${id}】吗？\n\n支付方式：${item.paymentType}\n应付金额：${amountToPay.toLocaleString()}\n\n结算后将推送到【应付管理】。`)) return;

    // A. 修改干线数据状态 -> "已结算"
    item.settlementStatus = "已结算";
    item.paidAmount = amountToPay;
    
    sessionStorage.setItem('TrunkBatches', JSON.stringify(trunkList));

    // B. 创建应付数据 (Push to AP)
    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");
    
    // 检查是否已存在，防止重复添加
    const exist = apList.find(a => a.sourceId === id);
    if(!exist) {
        const newAP = {
            apId: "AP" + new Date().getTime().toString().slice(-6),
            sourceId: item.id,
            payee: `${item.driver} (${item.plate})`,
            amount: amountToPay,
            applyDate: new Date().toISOString().split('T')[0],
            status: "待付款"
        };
        apList.unshift(newAP); // 加到最前
        sessionStorage.setItem('APApplications', JSON.stringify(apList));
    }

    alert("✅ 结算成功！已转入应付管理。");
    loadContent('SettlementTrunk'); // 刷新当前页
}

// =======================================================
// 2. 应付管理相关 (APPaymentApply)
// =======================================================

/** 确认支付 (模拟打款) */
window.confirmPayment = function(apId) {
    if(!confirm(`确认对单据【${apId}】进行银行打款吗？`)) return;

    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");
    let item = apList.find(i => i.apId === apId);
    
    if(item) {
        item.status = "已支付";
        item.payDate = new Date().toISOString().split('T')[0];
        sessionStorage.setItem('APApplications', JSON.stringify(apList));
        
        alert("✅ 支付成功！资金已扣除。");
        loadContent('APPaymentApply'); 
    }
}

/** 取消结算 (回滚) - 这就是你找不到的按钮逻辑 */
window.cancelSettlement = function(apId, sourceId) {
    if(!confirm(`确认退回单据【${apId}】吗？\n\n注意：这将删除应付申请，并将源单据【${sourceId}】回滚为 [待结算] 状态。`)) return;

    // A. 从应付表删除
    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");
    let newList = apList.filter(i => i.apId !== apId);
    sessionStorage.setItem('APApplications', JSON.stringify(newList));

    // B. 回滚干线数据状态
    let trunkList = JSON.parse(sessionStorage.getItem('TrunkBatches'));
    let trunkItem = trunkList.find(i => i.id === sourceId);
    
    if (trunkItem) {
        trunkItem.settlementStatus = "待结算"; // 变回红色待结算
        trunkItem.paidAmount = 0;
        sessionStorage.setItem('TrunkBatches', JSON.stringify(trunkList));
    }

    alert("✅ 结算已取消！源单据状态已回滚。");
    loadContent('APPaymentApply'); // 刷新页面
}

// =======================================================
// 3. 运单结算相关 (SettlementWaybill) - 保留原有逻辑
// =======================================================
window.settleWaybill = function (id) {
    let list = JSON.parse(sessionStorage.getItem('BizWaybills'));
    let item = list.find(i => i.id === id);
    if (item) {
        item.status = '已结算';
        let currentVal = item.totalAmount || item.amount || "1000";
        item.totalAmount = parseFloat(currentVal.toString().replace(/,/g, '')).toFixed(2);
        
        sessionStorage.setItem('BizWaybills', JSON.stringify(list));
        alert("✅ 费用计算完成！状态已更新为【已结算】。");
        loadContent('SettlementWaybill');
    }
}


// =======================================================
// 3. 撤销支付 (线下转账反悔逻辑)
// =======================================================
window.revokePayment = function(apId) {
    // 既然是线下转账，不需要太严重的警告，简单确认即可
    if(!confirm(`确认要撤销单据【${apId}】的支付状态吗？\n\n状态将变回【待付款】，以便您重新操作或取消结算。`)) return;

    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");
    let item = apList.find(i => i.apId === apId);
    
    if(item) {
        // 1. 状态回滚
        item.status = "待付款";
        delete item.payDate; // 清除支付时间
        
        sessionStorage.setItem('APApplications', JSON.stringify(apList));
        
        // 2. 刷新页面
        alert("✅ 已撤销支付状态！\n\n现在您可以点击【取消结算】来删除此单据了。");
        loadContent('APPaymentApply'); 
    }
}




// =======================================================
// 4. 短途批次结算逻辑 (SettlementShortHaul)
// =======================================================

// 查看短途详情
window.viewShortHaulDetail = function(id) {
    window.g_currentShortId = id;
    loadContent('SettlementShortHaulDetail');
}

// 结算短途运费 -> 转应付
window.settleShortHaul = function(id) {
    let list = JSON.parse(sessionStorage.getItem('ShortBatches'));
    let item = list.find(i => i.id === id);
    if (!item) return;

    if(!confirm(`确认结算短途批次【${id}】吗？\n\n计费模式：${item.feeType}\n应付金额：${item.totalAmount.toLocaleString()}`)) return;

    // 1. 自身状态更新
    item.status = "已结算";
    sessionStorage.setItem('ShortBatches', JSON.stringify(list));

    // 2. 推送至应付 (AP)
    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");
    apList.unshift({
        apId: "AP" + new Date().getTime().toString().slice(-6),
        sourceId: item.id,
        payee: `${item.driver} (短途)`,
        amount: item.totalAmount,
        applyDate: new Date().toISOString().split('T')[0],
        status: "待付款"
    });
    sessionStorage.setItem('APApplications', JSON.stringify(apList));

    alert("✅ 短途费用结算成功！已生成付款申请。");
    
    // 刷新页面 (如果在详情页则刷新详情页，在列表页则刷新列表页)
    // 简单判断：如果当前有 ID，说明在详情页
    if(window.g_currentShortId === id && document.querySelector('h2').innerText.includes('详情')) {
        loadContent('SettlementShortHaulDetail');
    } else {
        loadContent('SettlementShortHaul');
    }
}
// =======================================================
// 短途 & 智能跳转 补丁 (Settlement Fix)
// =======================================================

// 1. 查看短途批次详情 (核心函数，之前可能漏了)
window.viewShortHaulDetail = function(id) {
    // 设置全局变量，告诉详情页加载哪个ID
    window.g_currentShortId = id; 
    // 跳转到短途详情页
    loadContent('SettlementShortHaulDetail');
}

// 2. 智能跳转路由 (应付 -> 详情)
// 这个函数会根据单号前缀，自动决定是去“干线详情”还是“短途详情”
window.jumpToSourceDetail = function(sourceId) {
    if (!sourceId) return;

    // A. 如果是干线 (APC开头)
    if (sourceId.startsWith('APC')) {
        if (typeof window.viewTrunkDetail === 'function') {
            window.viewTrunkDetail(sourceId);
        } else {
            console.error("未找到 viewTrunkDetail 函数");
        }
    } 
    // B. 如果是短途 (SH开头) - ★★★ 修复这里 ★★★
    else if (sourceId.startsWith('SH')) {
        if (typeof window.viewShortHaulDetail === 'function') {
            window.viewShortHaulDetail(sourceId);
        } else {
            alert("❌ 错误：未找到短途详情页函数。请确保代码已更新。");
        }
    } 
    // C. 其他情况
    else {
        alert(`未知的单据类型 (${sourceId})，无法查看详情。`);
    }
}



// =======================================================
// 充值校验逻辑 (防止手残)
// =======================================================

// 1. 打开充值录入窗口
window.openTopUpModal = function(flowId) {
    let flows = JSON.parse(sessionStorage.getItem('BankFlows'));
    let flow = flows.find(f => f.id === flowId);
    
    if(!flow) return;

    // 模拟弹窗输入 (真实开发中应使用 Modal 组件)
    // 这里我们用 prompt 模拟让财务录入金额的过程，以此来测试“手残”场景
    const inputCustomer = prompt(`正在关联流水【${flowId}】\n付款方：${flow.payer}\n实收金额：${flow.amount}\n\n请输入【充值客户名称】：`, flow.payer);
    if(inputCustomer === null) return;

    const inputAmountStr = prompt(`请输入【充值金额】进行入账：\n(注意：必须与实收金额 ${flow.amount} 完全一致)`, flow.amount); // 默认填入正确金额，但允许用户修改以测试报错
    if(inputAmountStr === null) return;

    const inputAmount = parseFloat(inputAmountStr);

    // ★★★ 核心校验逻辑 ★★★
    if (Math.abs(inputAmount - flow.amount) > 0.01) {
        // 播放警告音效（可选）
        // alert 报错
        alert(`❌ 校验失败！禁止入账！\n\n原因：收款单与客户充值单据不符合。\n\n银行实收：${flow.amount}\n您录入的：${inputAmount}\n\n差额：${(inputAmount - flow.amount).toFixed(2)}\n请重新核对！`);
        return; // 阻断流程
    }

    // 校验通过，执行入账
    saveTopUp(flow, inputCustomer, inputAmount);
}

// 2. 保存充值单
function saveTopUp(flow, customer, amount) {
    // A. 更新银行流水状态 -> 已认领
    let flows = JSON.parse(sessionStorage.getItem('BankFlows'));
    let targetFlow = flows.find(f => f.id === flow.id);
    targetFlow.status = "已认领";
    sessionStorage.setItem('BankFlows', JSON.stringify(flows));

    // B. 生成充值单
    let preCollections = JSON.parse(sessionStorage.getItem('PreCollections') || "[]");
    preCollections.unshift({
        id: "RC" + new Date().getTime().toString().slice(-6),
        customer: customer,
        amount: amount,
        sourceId: flow.id,
        date: new Date().toISOString().split('T')[0]
    });
    sessionStorage.setItem('PreCollections', JSON.stringify(preCollections));

    alert("✅ 校验通过！充值成功。\n资金已计入客户账户。");
    loadContent('ARPrecollection'); // 刷新页面
}

// =======================================================
// 充值联动与强校验逻辑 (Voucher Linkage)
// =======================================================

// 1. 打开充值弹窗
window.openTopUpVerifyModal = function(custId, custName) {
    document.getElementById('topUpModal').style.display = 'block';
    document.getElementById('tu_customer_id').value = custId;
    document.getElementById('tu_customer_name').innerText = custName;
    
    // 重置输入框
    document.getElementById('tu_voucher_select').value = "";
    document.getElementById('tu_input_amount').value = "";
}

// 2. (可选) 辅助功能：选择凭证时提示金额，但强迫用户手输，或者你可以选择自动填充
window.autoFillAmount = function(selectObj) {
    // 这里我选择不自动填充，而是让用户看到金额后，必须手动输一遍，以达到“双重核对”的目的
    // 如果你想自动填充，把下面注释解开：
    // const amount = selectObj.options[selectObj.selectedIndex].getAttribute('data-amount');
    // if(amount) document.getElementById('tu_input_amount').value = amount;
}

// 3. ★★★ 核心：执行充值 (带金额限制) - 修复版 ★★★
window.performTopUp = function() {
    const custId = document.getElementById('tu_customer_id').value;
    const voucherId = document.getElementById('tu_voucher_select').value;
    const inputAmount = parseFloat(document.getElementById('tu_input_amount').value);

    // 限制1：必须选择凭证
    if (!voucherId) {
        alert("❌ 操作禁止！\n\n必须选择一张【已审核】的收款凭证作为资金来源。");
        return;
    }

    if (!inputAmount) {
        alert("❌ 请输入金额！");
        return;
    }

    // ★★★ 修复：同时在两个库里找凭证 ★★★
    let financeVouchers = JSON.parse(sessionStorage.getItem('FinanceVouchers') || "[]");
    let manualVouchers = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");
    
    // 先在出纳库找
    let voucher = financeVouchers.find(v => v.id === voucherId);
    let source = "finance"; // 标记来源

    // 没找到就在会计库找
    if (!voucher) {
        voucher = manualVouchers.find(v => v.id === voucherId);
        source = "manual";
    }

    if (!voucher) {
        alert("❌ 系统错误：未找到凭证数据！");
        return;
    }

    // 限制2：金额强校验 (Input == Voucher)
    // 注意：voucher.amount 可能是字符串，需要转换
    const vAmount = parseFloat(voucher.amount);
    
    if (Math.abs(vAmount - inputAmount) > 0.01) {
        alert(`❌ 校验失败！金额不匹配！\n\n凭证金额：${vAmount}\n输入金额：${inputAmount}\n\n必须完全一致。`);
        return; 
    }

    // --- 校验通过，执行逻辑 ---

    // A. 标记凭证为已使用 (更新状态)
    // 根据来源更新不同的 Storage
    if (source === "finance") {
        voucher.status = "已入账";
        sessionStorage.setItem('FinanceVouchers', JSON.stringify(financeVouchers));
    } else {
        voucher.status = "已入账"; // 会计凭证也标记为已入账(虽然一般会计凭证状态是已记账，但为了闭环逻辑)
        sessionStorage.setItem('ManualVouchers', JSON.stringify(manualVouchers));
    }

    // B. 增加客户余额
    let accounts = JSON.parse(sessionStorage.getItem('CustomerAccounts'));
    let account = accounts.find(a => a.id === custId);
    
    account.balance += inputAmount;
    account.lastUpdate = new Date().toISOString().split('T')[0];
    
    sessionStorage.setItem('CustomerAccounts', JSON.stringify(accounts));

    alert(`✅ 充值成功！\n\n客户余额已更新。\n凭证【${voucherId}】已核销。`);
    
    document.getElementById('topUpModal').style.display = 'none';
    loadContent('FundCustomerAcct'); // 刷新页面
}



// =======================================================
// 文件：settlement.js
// 逻辑：收款单 -> 自动转凭证(待审核) -> 审核 -> 充值
// =======================================================

// 1. 录入收款单 (FundExecution)
window.submitVoucher = function() {
    const target = document.getElementById('v_target').value; // 客户名称
    const amount = parseFloat(document.getElementById('v_amount').value); // 金额

    if (!target || !amount || amount <= 0) {
        alert("请输入完整的摘要和金额！");
        return;
    }

    let vouchers = JSON.parse(sessionStorage.getItem('FinanceVouchers') || "[]");
    
    // 生成新的凭证对象
    const newVoucher = {
        id: "RC" + new Date().getTime().toString().slice(-6),
        date: new Date().toISOString().split('T')[0],
        type: "收款",
        target: target,
        amount: amount,
        method: "银行转账",
        
        // ★★★ 重点 1：录入即为【收款单】，状态默认为【待审核】 ★★★
        // 此时它还不能被充值模块看到，必须经过审核
        status: "待审核" 
    };
    
    vouchers.unshift(newVoucher);
    sessionStorage.setItem('FinanceVouchers', JSON.stringify(vouchers));

    alert("✅ 收款单录入成功！\n\n系统已自动生成【收款凭证】，状态为：⏳ 待审核。\n请进行审核操作后，方可用于客户充值。");
    
    document.getElementById('voucherModal').style.display = 'none';
    loadContent('FundExecution'); // 刷新页面，你会在列表看到这条待审核的单子
}

// 2. 审核凭证 (FundExecution)
window.auditVoucher = function(id) {
    if(!confirm("确认审核通过该收款凭证吗？\n\n审核通过后，该数据将对【客户资金账户】可见。")) return;

    let vouchers = JSON.parse(sessionStorage.getItem('FinanceVouchers') || "[]");
    let item = vouchers.find(v => v.id === id);
    
    if(item) {
        // ★★★ 重点 2：审核动作，将状态改为【已审核】 ★★★
        // 只有变成了"已审核"，充值页面才能读取到它
        item.status = "已审核"; 
        
        sessionStorage.setItem('FinanceVouchers', JSON.stringify(vouchers));
        
        alert("✅ 审核通过！\n\n该凭证已生效，现在可以去【客户资金账户】进行关联充值了。");
        loadContent('FundExecution'); // 刷新页面
    }
}
