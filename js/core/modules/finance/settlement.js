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
                item.amount = (parseFloat(item.amount) || 1000).toFixed(2); // 模拟计算
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

            // 模拟输入退款金额
            const refundAmountStr = prompt(`当前运单【${id}】金额：${item.amount}\n请输入退款金额 (例如退运费400)：`, "400");
            if (!refundAmountStr) return;

            const refundAmount = parseFloat(refundAmountStr);
            if (isNaN(refundAmount) || refundAmount <= 0) return alert("金额无效");

            if (!confirm(`确认退款 ${refundAmount} 元吗？\n系统将生成一条负数结算单。`)) return;

            // 生成红字调整单
            const refundBill = {
                id: id + '-退', // 关联原单号
                client: item.client,
                date: new Date().toISOString().split('T')[0],
                amount: '-' + refundAmount.toFixed(2), // ★★★ 负数 ★★★
                status: '已结算', // ★★★ 关键：设为已结算，以便下一步能被选中 ★★★
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

            const newAmount = prompt(`编辑运单【${id}】\n\n当前金额：${item.amount}\n请输入修正后的金额：`, item.amount);
            if (newAmount && newAmount !== item.amount) {
                item.amount = parseFloat(newAmount).toFixed(2);
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
                    totalAmount += parseFloat(i.amount.replace(/,/g, ''));
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
