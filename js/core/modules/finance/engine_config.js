/**
 * 会计引擎配置数据源
 * 根据你提供的列表整理成的树形结构
 */
const ENGINE_DATA = [
    {
        name: "挂账",
        children: [
            {
                name: "运单",
                items: ["现付挂账", "现返挂账", "网点中转现返挂账", "单票提货费已付挂账", "单票提货费未付挂账", "欠付挂账", "欠返挂账", "网点中转欠返挂账", "月结挂账", "回付挂账", "货到打卡挂账", "货款扣挂账", "税费挂账", "货款手续费挂账", "中转费挂账", "回扣挂账", "开单进仓费挂账", "到站进仓费挂账", "员工中转费挂账", "总部代收货款挂账", "出发网点代收货款挂账", "目的网点代收货款挂账", "途径网点代收货款挂帐", "出发网点到付挂账", "途径网点到付挂账", "目的网点到付挂账", "总部货款扣挂账", "总部货款手续费挂账", "单票送货费挂账", "单票送货上楼费挂账", "单票送货装卸费挂账", "单票送货进仓费挂账", "出发网点垫付费已付挂账", "出发网点垫付费未付挂账", "目的网点垫付费挂账", "途径网点垫付费挂帐", "总部代收运费挂账", "出发网点代收运费挂账", "目的网点代收运费挂账", "途径网点代收运费挂帐", "总部垫付费挂账", "网点中转费合计挂账", "发站单票装车费挂账", "发站单票其他费挂账", "到站单票卸车费挂账", "到站单票其他费挂账", "发站落地中转费挂账", "到站落地中转费挂账", "发站落地中转费异动挂账", "到站落地中转费异动挂账", "发站落地送货费挂账", "到站落地送货费挂账", "发站落地送货异动费挂账", "到站落地送货费异动挂账", "发站平台服务费挂账", "到站平台服务费挂账", "平台增值费挂账"]
            },
            {
                name: "异动",
                items: ["现返异动增款挂账", "欠返异动增款挂账", "回扣异动增款挂账", "现付异动增款挂账", "出发网点到付异动增款挂账", "途径网点到付异动增款挂账", "目的网点到付异动增款挂账", "欠付异动增款挂账", "月结异动增款挂账", "回付异动增款挂账", "货款扣异动增款挂账", "货到打卡异动增款挂账", "现返异动减款挂账", "欠返异动减款挂账", "回扣异动减款挂账", "现付异动减款挂账", "出发网点到付异动减款挂账", "途径网点到付异动减款挂账", "目的网点到付异动减款挂账", "欠付异动减款挂账", "月结异动减款挂账", "回付异动减款挂账", "货款扣异动减款挂账", "货到打卡异动减款挂账", "总部代收货款异动挂账", "出发网点代收货款异动挂账", "目的网点代收货款异动挂账", "途径网点代收货款异动挂帐", "总部垫付费异动挂账", "出发网点垫付费异动挂账", "目的网点垫付费异动挂账", "途径网点垫付费异动挂帐", "货款手续费异动挂账", "总部货款手续费异动挂账"]
            },
            {
                name: "干线",
                items: ["现付运输费挂账", "到付运输费挂账", "回付运输费挂账", "现付油卡费挂账", "整车保险费挂账", "发站装车费挂账", "发站其它费挂账", "到站卸车费挂账", "到站其它费挂账", "整车信息费挂账", "发站落地费挂账", "到站落地费挂账", "发站落货费挂账", "到站落货费挂账", "挂车使用费挂账"]
            },
            {
                name: "应付挂账",
                items: ["应付到付挂账", "应付现付挂账", "应付油卡挂账", "应付回付挂账", "应付保险费挂账"]
            },
            {
                name: "应收挂账",
                items: ["应收到付挂账", "应收现付挂账", "应收油卡挂账", "应收回付挂账", "应收其他挂账", "应收信息费挂账"]
            }
            // ... (篇幅原因省略部分，你需要将所有分类按此结构填入) ...
        ]
    },
    {
        name: "结算",
        children: [
            {
                name: "运单",
                items: ["现付结算", "现返结算", "单票提货费已付结算", "单票提货费未付结算", "欠付结算", "欠返结算", "到付结算", "月结结算", "回付结算", "货到打卡结算", "货款扣结算", "代收货款回收", "代收货款汇款", "代收货款到账", "代收货款发放", "到付汇款", "到付到账", "到付异动汇款", "到付异动到账", "税费结算", "配安费结算", "货款手续费结算", "中转费结算", "回扣结算", "到站进仓费结算", "垫付费回收", "垫付费汇款", "垫付费到账", "垫付费已付发放", "垫付费未付发放", "代收运费回收", "代收运费汇款", "代收运费到账", "代收运费发放"]
            }
            // ... 其他结算类目 ...
        ]
    },
    {
        name: "账户结算",
        children: [
            {
                 name: "账户收款（网点间交易）",
                 items: ["到付出发网点收款", "到付途径网点收款", "货款出发网点收款", "货款途径网点收款", "货款总部收款", "成本中转费收款"] 
            },
            {
                 name: "账户扣款（网点间交易）",
                 items: ["到付目的网点付款", "到付途径网点付款", "货款目的网点付款", "货款途径网点付款", "货款总部付款", "成本中转费付款"]
            }
        ]
    }
    // ... 账户管理、在线账户管理等 ...
];

/**
 * 渲染左侧树形菜单 HTML
 */
function renderEngineTree() {
    let html = '';
    ENGINE_DATA.forEach((category, index) => {
        // Level 1: 挂账, 结算...
        html += `<div class="tree-node level-1">${category.name}</div>`;
        
        if (category.children) {
            category.children.forEach(sub => {
                // Level 2: 运单, 异动...
                html += `<div class="tree-node level-2">${sub.name}</div>`;
                
                if (sub.items) {
                    sub.items.forEach(item => {
                        // Level 3: 具体费用 (点击触发右侧加载)
                        html += `<div class="tree-node level-3" onclick="loadEngineConfig('${item}')">
                                    <i class="icon-file-text"></i> ${item}
                                 </div>`;
                    });
                }
            });
        }
    });
    return html;
}

/**
 * 模拟获取某项费用的默认配置 (用于右侧显示)
 * @param {string} itemName 费用名称
 */
function getMockConfig(itemName) {
    // 这里简单模拟，实际可以从后端获取
    // 假设 "挂账" 类通常借方是 应收/费用，贷方是 收入/应付
    const isIncome = itemName.includes("现付") || itemName.includes("到付");
    
    return [
        {
            dir: "借",
            subjectCode: "1122",
            subjectName: "应收账款",
            aux: "客户/网点",
            formula: `${itemName}.金额`
        },
        {
            dir: "贷",
            subjectCode: "6001",
            subjectName: "主营业务收入",
            aux: "部门",
            formula: `${itemName}.金额` // 简单模拟借贷相等
        }
    ];
}

/**
 * 核心：点击左侧菜单，加载右侧配置界面 (智能双模式版)
 * @param {string} itemName 费用名称
 */
window.loadEngineConfig = function(itemName) {
    // 1. 高亮左侧菜单
    if (event && event.target) {
        document.querySelectorAll('.tree-node').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }

    // ---------------------------------------------------------
    // 核心逻辑：判断是“结算业务”还是“普通挂账业务”
    // ---------------------------------------------------------
    // 规则：如果名称包含 '结算'、'收款'、'付款'，则视为需要收支方式的业务
    const isSettlementType = itemName.includes('结算') || 
                             itemName.includes('收款') || 
                             itemName.includes('付款');

    // 2. 准备数据 (模拟后端返回)
    let mockConfig = {};
    
    if (isSettlementType) {
        // [模式A] 结算类：贷方是动态的
        mockConfig = {
            abstract: `付 ${itemName}`,
            debitCode: '6401', debitName: '主营业务成本',
            creditCode: '', creditName: '' // 结算类不需要预设贷方
        };
    } else {
        // [模式B] 挂账/非结算类：借贷都是固定的
        mockConfig = {
            abstract: ` ${itemName}`,
            debitCode: '6401', debitName: '主营业务成本',
            creditCode: '2202', creditName: '应付账款_供应商' // 挂账类必须写死贷方
        };
    }

    // 3. 构建差异化的 HTML 片段

    // [差异点1] 顶部提示语 (只有结算才显示那个橙色的提示)
    const topTipHTML = isSettlementType 
        ? `<div style="color: #ff6600; font-size: 12px; margin-bottom: 20px; line-height: 1.5;">
             * 结算凭证的分录行从当前会计引擎读取科目，凭证另外的分录行从结算时您选择的收支方式对应的科目中读取
           </div>`
        : `<div style="color: #ff6600; font-size: 12px; margin-bottom: 20px; line-height: 1.5;">
             * 该业务为标准记账凭证，请分别设置借方与贷方科目。
           </div>`;

    // [差异点2] 贷方分录行的显示方式
    let creditRowHTML = '';
    
    if (isSettlementType) {
        // === 结算模式：显示“自动读取” ===
        creditRowHTML = `
            <tr style="height: 45px; border-bottom: 1px solid #333; background-color: #fcfcfc;">
                <td style="border-right: 1px solid #333; padding: 5px;">
                    <span style="color: #999;">(同上)</span>
                </td>
                <td style="border-right: 1px solid #333; padding: 5px; text-align: left; color: #888;">
                    <i>[自动读取]</i>
                </td>
                <td style="border-right: 1px solid #333; padding: 5px; text-align: left; color: #1890ff;">
                    ⚙️ 关联收支方式科目
                </td>
                <td style="border-right: 1px solid #333; padding: 5px;"></td>
                <td style="padding: 5px; font-weight: bold;">结算金额</td>
            </tr>`;
    } else {
        // === 标准模式：显示“输入框” ===
        creditRowHTML = `
            <tr style="height: 45px; border-bottom: 1px solid #333;">
                <td style="border-right: 1px solid #333; padding: 5px;">
                    <input type="text" value="凭证摘要" style="width: 80%; border: none; outline: none;">
                    <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                </td>
                <td style="border-right: 1px solid #333; padding: 5px; text-align: left;">
                    <input type="text" value="${mockConfig.creditCode}" style="width: 80%; border: none; outline: none;">
                    <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                </td>
                <td style="border-right: 1px solid #333; padding: 5px; text-align: left;">
                    <input type="text" value="${mockConfig.debitName}" style="width: 80%; border: none; outline: none;">
                    <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                </td>
                <td style="border-right: 1px solid #333; padding: 5px;">
                    <input type="text" value="${isSettlementType ? '结算金额' : '业务发生额'}" style="width: 80%; border: none; outline: none;">
                    <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                </td>
                <td style="padding: 5px; font-weight: bold;">
                    <input type="text" value="${isSettlementType ? '结算金额' : '业务发生额'}" style="width: 80%; border: none; outline: none;">
                    <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                </td>
            </tr>`;
    }

    // 4. 组装最终 HTML
    const rightHTML = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333;">
            
            ${topTipHTML}

            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="font-size: 20px; font-weight: 500; color: #333; margin: 0;">凭证详情</h2>
            </div>

            <div style="border: 1px solid #333; margin-bottom: 15px;">
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 13px;">
                    <thead>
                        <tr style="font-weight: bold; border-bottom: 1px solid #333; height: 40px; background: #f0f0f0;">
                            <th style="width: 25%; border-right: 1px solid #333;">凭证摘要</th>
                            <th style="width: 20%; border-right: 1px solid #333;">科目代码</th>
                            <th style="width: 25%; border-right: 1px solid #333;">科目名称</th>
                            <th style="width: 15%; border-right: 1px solid #333;">借方金额</th>
                            <th style="width: 15%;">贷方金额</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="height: 45px; border-bottom: 1px solid #333;">
                            <td style="border-right: 1px solid #333; padding: 5px;">
                                <input type="text" value="凭证摘要" style="width: 80%; border: none; outline: none;">
                                <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                            </td>
                            <td style="border-right: 1px solid #333; padding: 5px; text-align: left;">
                                <input type="text" value="${mockConfig.debitCode}" style="width: 80%; border: none; outline: none;">
                                <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                            </td>
                            <td style="border-right: 1px solid #333; padding: 5px; text-align: left;">
                                <input type="text" value="${mockConfig.debitName}" style="width: 80%; border: none; outline: none;">
                                <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                            </td>
                            <td style="border-right: 1px solid #333; padding: 5px; font-weight: bold;">
                            <input type="text" value="${isSettlementType ? '结算金额' : '业务发生额'}" style="width: 80%; border: none; outline: none;">
                                <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                            </td>
                            <td style="padding: 5px;">
                                <input type="text" value="${isSettlementType ? '结算金额' : '业务发生额'}" style="width: 80%; border: none; outline: none;">
                                <span style="font-size: 10px; color: #999; cursor:pointer;">✎</span>
                            </td>
                        </tr>

                        ${creditRowHTML}
                    </tbody>
                </table>
            </div>

            <div style="display: flex; align-items: center; margin-top: 10px;">
                <label style="width: 70px; font-weight: bold; font-size: 13px;">规则备注：</label>
                <input type="text" placeholder="请填写规则备注" style="flex: 1; border: 1px solid #ccc; padding: 8px; border-radius: 2px; font-size: 13px;">
            </div>

            <div style="margin-top: 30px; text-align: right;">
                <button onclick="ViewManager.renderAccountingEngine()" style="background: white; border: 1px solid #ccc; color: #333; padding: 6px 15px; margin-right: 10px; cursor: pointer;">取消</button>
                <button onclick="alert('规则保存成功！')" style="background: #1890ff; border: none; color: white; padding: 6px 20px; cursor: pointer; border-radius: 2px;">保存</button>
            </div>
        </div>
    `;

    // 5. 渲染
    const contentArea = document.getElementById('configPanel') || document.getElementById('engine-content-area');
    if (contentArea) {
        contentArea.style.display = 'block';
        contentArea.innerHTML = rightHTML;
        const emptyState = document.getElementById('emptyState');
        if(emptyState) emptyState.style.display = 'none';
        const titleEl = document.getElementById('currentScenarioTitle');
        if(titleEl) titleEl.innerText = itemName;
    }
};