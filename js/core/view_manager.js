/**
 * 模块代码与中文名称映射 (保持不变)
 */
function getModuleName(code) {
  const names = {
    Dashboard: "财务概览 / 仪表盘",
    SettlementWaybill: "运单结算",
    SettlementTrunk: "干线批次结算",
    SettlementShortHaul: "短途批次结算",
    SettlementRuleConfig: "计费规则配置",
    ReconSite: "网点对账",
    ReconCustomer: "客户对账",
    ReconCarrier: "承运商对账",
    ReconDriver: "司机对账",
    ReconDiffHandle: "对账差异处理",
    ARCustomerStatement: "客户对账单列表",
    ARPrecollection: "预收款单",
    ARCollectionVerify: "客户收款核销",
    ARAgeAnalysis: "客户账龄分析",
    APPaymentApply: "供应商付款申请",
    APPrepayment: "预付款单",
    APPaymentVerify: "付款核销",
    APInvoiceManage: "进项发票台账",
    FundCustomerAcct: "客户资金账户",
    FundEnergyAcct: "能源账户管理",
    FundWallet: "司机/网点钱包",
    FundExecution: "收款与付款执行",
    FundBankConnect: "银企直联",
    FundClearingRule: "清分与分账规则",
    ExpenseLoan: "借款单",
    ExpenseRepay: "还款单",
    ExpenseDaily: "日常费用报销",
    ExpenseTravel: "差旅报销",
    ExpenseCompensation: "酬金结算",
    PendingWaybill: "运单挂账",
    PendingAbnormal: "异动挂账",
    PendingOther: "其他挂账",
    TaxInputInvoice: "进项发票台账",
    TaxOutputInvoice: "销项发票台账",
    TaxRateConfig: "税率配置",
    BudgetPlanning: "预算编制",
    BudgetExecutionAnalysis: "预算执行分析",
    BudgetPerformance: "绩效考核",
    RiskSensitiveLog: "敏感操作日志",
    RiskRedStamping: "红冲与反结账记录",
    RiskDataChange: "数据变更明细",
    AcctSubject: "会计科目",
    AcctSet: "会计账套",
    AcctPeriod: "会计期间",
    AcctAuxiliary: "辅助核算项",
    AcctRule: "记账规则",
    AssetCard: "资产卡片",
    AssetDepreciation: "折旧计算",
    AssetChange: "资产变动",
    VoucherEntryReview: "凭证录入",
    VoucherQueryPrint: "凭证查询/审核",
    SubjectSummary: "科目汇总表",
    EngineMapping: "业务单据映射配置",
    EngineTemplate: "自动分录模板",
    EngineLog: "凭证生成日志",
    PeriodEndProfit: "结转损益",
    PeriodEndClose: "月末结账/锁定",
    ReportBalanceSheet: "资产负债表",
    ReportIncomeStatement: "利润损益表",
    ReportCashFlow: "现金流量表",
    ReportOtherStatutory: "其他报表",
    ReportVehicleProfit: "单车线路盈亏分析",
    ReportCustomerProfit: "客户毛利分析",
    ReportARAPAge: "应收应付账龄分析",
    BankStatementSync: "银行对账单同步",
    OnlinePayment: "线上支付/代收付",
    BankBalanceQuery: "银行余额实时查询",
    // BasicSetup: "基础设置",
    Permission: "权限管理",
    DriverProfileDetail: "司机档案详情",
   
  };
  return names[code] || "未知模块";
}

/**
 * 加载内容到内容区，并更新菜单激活状态
 */
function loadContent(moduleCode, element = null) {
  const contentArea = document.getElementById("content-area");
  const allItems = document.querySelectorAll(".menu-item, .sub-menu-item");

  allItems.forEach((item) => item.classList.remove("active"));

  if (element) {
    element.classList.add("active");
  } else {
    const defaultItem = document.querySelector(
      `.menu-item[onclick*="'${moduleCode}'"]`
    );
    if (defaultItem) defaultItem.classList.add("active");
  }

  let contentHTML = `<h2>${getModuleName(moduleCode)}</h2>`;

  // =========================================================================
  // 核心页面逻辑开始
  // =========================================================================

  // =========================================================================
  // 0. 仪表盘 - [图形化流程导航]
  // =========================================================================
  if (moduleCode === "Dashboard") {
    // --- 1. 定义流程导航的 CSS 样式 ---
    const flowStyle = `
                    <style>
                        .flow-container {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            background: white;
                            padding: 30px 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                            margin-bottom: 20px;
                            overflow-x: auto;
                        }
                        .flow-step {
                            text-align: center;
                            cursor: pointer;
                            transition: transform 0.2s;
                            flex: 1;
                            min-width: 80px;
                        }
                        .flow-step:hover {
                            transform: translateY(-5px);
                        }
                        .flow-icon {
                            width: 50px;
                            height: 50px;
                            border-radius: 12px;
                            background: #f0f2f5;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            margin: 0 auto 10px auto;
                            color: #555;
                            border: 2px solid transparent;
                            transition: all 0.2s;
                        }
                        .flow-step:hover .flow-icon {
                            background: #e6f7ff;
                            border-color: #1890ff;
                            color: #1890ff;
                        }
                        .flow-title {
                            font-size: 13px;
                            font-weight: bold;
                            color: #333;
                        }
                        .flow-arrow {
                            font-size: 20px;
                            color: #ccc;
                            margin: 0 10px;
                            padding-bottom: 20px; /* 对齐图标中心 */
                        }
                    </style>
                `;

    // --- 2. 定义流程节点 (您可以根据需要调整名称和跳转模块) ---
    // 图标使用 Emoji 方便渲染，也可换成 img 标签
    const flowHtml = `
                    <div class="flow-container">
                        
                      

                        <div class="flow-step" onclick="loadContent('VoucherEntryReview')">
                            <div class="flow-icon">📝</div>
                            <div class="flow-title">凭证处理</div>
                        </div>
                        <div class="flow-arrow">➔</div>

                        <div class="flow-step" onclick="loadContent('FundCollectionEntry')">
                            <div class="flow-icon">💰</div>
                            <div class="flow-title">出纳管理</div>
                        </div>
                        <div class="flow-arrow">➔</div>

                        <div class="flow-step" onclick="loadContent('HRSalary')">
                            <div class="flow-icon">👥</div>
                            <div class="flow-title">工资管理</div>
                        </div>
                        <div class="flow-arrow">➔</div>

                        <div class="flow-step" onclick="loadContent('AssetCard')">
                            <div class="flow-icon">🚛</div>
                            <div class="flow-title">固定资产</div>
                        </div>
                        <div class="flow-arrow">➔</div>

                        <div class="flow-step" onclick="loadContent('AcctSubjectSummary')">
                            <div class="flow-icon">📖</div>
                            <div class="flow-title">账簿查询</div>
                        </div>
                        <div class="flow-arrow">➔</div>

                        <div class="flow-step" onclick="loadContent('PeriodEndProfit')">
                            <div class="flow-icon">🔄</div>
                            <div class="flow-title">期末处理</div>
                        </div>
                        <div class="flow-arrow">➔</div>

                        <div class="flow-step" onclick="loadContent('ReportBalanceSheet')">
                            <div class="flow-icon">📊</div>
                            <div class="flow-title">财务报表</div>
                        </div>

                    </div>
                `;

    contentHTML += `
                    ${flowStyle}
                    
                    <h2>财务工作台 </h2>
                    <p style="color: #7f8c8d; margin-bottom: 15px;">标准财务作业流程导航，点击图标快速进入功能模块。</p>
                    
                    ${flowHtml}

                    <div class="dashboard-grid">
                        <div class="kpi-card"><div class="kpi-title">本月收入 (RMB)</div><div class="kpi-value">1,250,000.00</div></div>
                        <div class="kpi-card"><div class="kpi-title">本月支出 (RMB)</div><div class="kpi-value" style="color:#e74c3c;">480,000.00</div></div>
                        <div class="kpi-card"><div class="kpi-title">现金余额 (RMB)</div><div class="kpi-value">7,800,000.00</div></div>
                        <div class="kpi-card"><div class="kpi-title">应收账款 (RMB)</div><div class="kpi-value" style="color:#f39c12;">950,000.00</div></div>
                    </div>
                    
                    <h3>待处理事项</h3>
                    <table class="data-table">
                        <thead>
                            <tr><th>事项</th><th>日期</th><th>金额</th><th>操作</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>待审核凭证 (凭证录入)</td><td>2025-11-20</td><td>-</td><td><button class="btn-primary" onclick="loadContent('VoucherQueryPrint')">去审核</button></td></tr>
                            <tr><td>未结转损益 (期末处理)</td><td>2025-11-30</td><td>-</td><td><button class="btn-primary" onclick="loadContent('PeriodEndProfit')">去结转</button></td></tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 1. 运单结算 (SettlementWaybill) - [最终版：含货物信息字段]
  // =========================================================================
  else if (moduleCode === "SettlementWaybill") {
    // 1. 初始化数据
    let waybills = JSON.parse(sessionStorage.getItem("BizWaybills"));

    // 强制重置数据以显示新字段 (如果旧数据没有goods字段)
    if (!waybills || !waybills[0].goods) {
      waybills = [
        {
          id: "YD202511001",
          client: "阳光制造有限公司",
          bizDate: "2025-11-18",
          route: "上海 -> 苏州",
          goods: "电子配件 500箱", // ★ 核心展示字段
          weight: "5吨",
          totalAmount: "1,200.00",
          status: "已结算",
          details: { 标准运费: 1000, 提货费: 200 },
          reconId: "DZ202511-001",
        },
        {
          id: "YD202511005",
          client: "阳光制造有限公司",
          bizDate: "2025-11-20",
          route: "上海 -> 北京",
          goods: "精密仪器 2台", // ★ 核心展示字段
          weight: "2台",
          totalAmount: "3,500.00",
          status: "已结算",
          details: { 标准运费: 3000, 送货费: 500 },
          reconId: "DZ202511-001",
        },
        {
          id: "YD202511003",
          client: "EASY贸易公司",
          bizDate: "2025-11-19",
          route: "杭州 -> 广州",
          goods: "服装面料 2吨", // ★ 核心展示字段
          weight: "2吨",
          totalAmount: "2,500.00",
          status: "已结算",
          details: { 标准运费: 2500 },
          reconId: "",
        },
        {
          id: "YD202511002",
          client: "张三 (个人)",
          bizDate: "2025-11-19",
          route: "同城配送",
          goods: "个人行李搬运", // ★ 核心展示字段
          weight: "1车",
          totalAmount: "500.00",
          status: "待结算",
          details: { 标准运费: 400, 提货费: 100 },
          reconId: "",
        },
      ];
      sessionStorage.setItem("BizWaybills", JSON.stringify(waybills));
    }

    const rows = waybills
      .map((w) => {
        const isSettled = w.status === "已结算";
        const isRefundBill = w.totalAmount.toString().includes("-");

        let statusColor = "#333";
        let action = "";

        if (w.status === "待结算") {
          statusColor = "#f39c12";
          action = `<a href="javascript:void(0)" onclick="settleWaybill('${w.id}')" style="color:#27ae60; font-weight:bold;">计算费用</a>`;
        } else if (isSettled) {
          statusColor = "#27ae60";
          if (!isRefundBill) {
            action = `<a href="javascript:void(0)" onclick="editWaybill('${w.id}')" style="color:#3498db;">编辑</a> | <a href="javascript:void(0)" onclick="handlePartRefund('${w.id}')" style="color:#e74c3c;">异常退款</a>`;
          } else {
            action = `<span style="color:#c0392b; font-size:12px;">(退款抵扣项)</span>`;
          }
        } else {
          statusColor = "#3498db";
          action = `<span style="color:#ccc;">已入账单</span>`;
        }

        const rowStyle = isRefundBill
          ? "background-color:#fff0f0; color:#c0392b;"
          : "";
        const checkboxState = isSettled ? "" : "disabled";

        return `<tr style="${rowStyle}">
                        <td><input type="checkbox" class="wb-check" value="${
                          w.id
                        }" data-client="${w.client}" ${checkboxState}></td>
                        <td><span style="font-weight:bold; color:#2980b9;">${
                          w.id
                        }</span></td>
                        <td>${w.client}</td>
                        
                        <td style="color:#555;">${w.goods || "-"}</td>
                        
                        <td>${w.route}</td>
                        <td>${w.bizDate}</td>
                        <td>${w.weight}</td>
                        <td style="text-align:right; font-weight:bold;">${
                          w.totalAmount
                        }</td>
                        <td><span style="color:${statusColor}; font-weight:bold;">${
          w.status
        }</span></td>
                        <td>${action}</td>
                    </tr>`;
      })
      .join("");

    contentHTML += `
                    <h2>运单结算</h2>
                    <p style="color:#7f8c8d;">管理运单的应收费用计算。确认无误后请点击“结算”锁定金额。</p>
                    
                    <div class="filter-area" style="background:white;padding:15px;margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; gap:10px;">
                            <input type="text" placeholder="运单号/客户/货物" style="padding:8px; border:1px solid #ccc; border-radius:4px;">
                            <input type="date" style="padding:8px; border:1px solid #ccc; border-radius:4px;">
                            <button class="btn-primary">查询</button>
                        </div>
                        <div>
                            <button class="btn-primary" style="background-color: #2980b9;" onclick="createReconBill()">📥 批量生成对账单</button>
                        </div>
                    </div>

                    <table class="data-table">
                        <thead><tr>
                            <th style="width:40px;"><input type="checkbox" onclick="toggleAll(this)"></th>
                            <th>运单号</th>
                            <th>客户名称</th>
                            
                            <th>货物名称</th>
                            
                            <th>起止路线</th>
                            <th>业务日期</th>
                            <th>计费依据</th>
                            <th style="text-align:right;">应收合计 (RMB)</th>
                            <th>结算状态</th>
                            <th>操作</th>
                        </tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
  }

// =========================================================================
  // 5. 干线批次结算 (SettlementTrunk) - [数据升级：支持详尽费用明细]
  // =========================================================================
  else if (moduleCode === "SettlementTrunk") {
    let trunkBatches = JSON.parse(sessionStorage.getItem('TrunkBatches'));
    
    // 如果数据结构里没有 unloading (卸车费)，强制刷新数据
    if (trunkBatches && trunkBatches.length > 0 && trunkBatches[0].fees.unloading === undefined) {
        trunkBatches = null; 
    }

    if (!trunkBatches || trunkBatches.length < 5) {
      trunkBatches = [];
      const routeMap = [
          { r: "上海->北京", b: "上海浦东分拨中心", dest: "北京顺义转运场" },
          { r: "广州->武汉", b: "广州白云转运中心", dest: "武汉东西湖分拨" },
          { r: "成都->西安", b: "成都双流集散仓", dest: "西安沣东转运中心" },
          { r: "深圳->长沙", b: "深圳宝安分拨中心", dest: "长沙雨花集散地" },
          { r: "杭州->郑州", b: "杭州萧山转运场", dest: "郑州经开分拨" }
      ];
      const drivers = ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十", "郑十一", "卫十二"];
      const batchStatuses = ["运输中", "已到达", "已卸车", "已发车"];
      const payTypes = ["现付", "到付", "回单付", "月结"];

      for (let i = 1; i <= 10; i++) {
          const isSettled = i <= 3; 
          const currentPayType = payTypes[i % 4]; 
          const routeInfo = routeMap[i % 5];
          const dateBase = `2025-11-${10 + i}`;
          
          // ★★★ 费用构成模拟 ★★★
          const baseFee = 2500 + (i * 100); // 干线费
          const loadFee = 200;              // 装车费
          const unloadFee = i % 2 === 0 ? 150 : 0; // 卸车费 (偶数行有)
          const abnFee = i % 3 === 0 ? 50 : 0;     // 异动费 (每3行有)
          const otherFee = i % 5 === 0 ? 100 : 0;  // 其他费 (每5行有)
          
          const total = baseFee + loadFee + unloadFee + abnFee + otherFee;

          trunkBatches.push({
              id: `APC2511${i.toString().padStart(3, '0')}`,
              branch: routeInfo.b,
              route: routeInfo.r,
              plate: `沪A${1000 + i}`,
              driver: drivers[i-1],
              date: dateBase,
              batchStatus: batchStatuses[i % 4], 
              settlementStatus: isSettled ? "已结算" : "待结算",
              paymentType: currentPayType,
              
              totalAmount: total,  
              paidAmount: isSettled ? total : 0, 

              // ★★★ 详细费用结构 ★★★
              fees: { 
                  trunk: baseFee,         // 干线费
                  loading: loadFee,       // 装车费
                  unloading: unloadFee,   // 卸车费
                  abnormal: abnFee,       // 异动费
                  abnormalDesc: "停车费", // 异动说明
                  other: otherFee,        // 其他费
                  otherDesc: "雨布耗材"   // 其他说明
              },

              timeline: [
                  { time: `${dateBase} 08:30`, event: "创建批次，等待装车" },
                  { time: `${dateBase} 10:30`, event: "司机已发车" },
                  { time: `${dateBase} 23:45`, event: `预计到达【${routeInfo.dest}】` }
              ]
          });
      }
      sessionStorage.setItem('TrunkBatches', JSON.stringify(trunkBatches));
    }

    // 渲染表格 (保持原样，只做简单展示)
    const rows = trunkBatches.map(row => {
        let batchBadge = "";
        switch(row.batchStatus) {
            case '已卸车': batchBadge = `<span style="color:#27ae60; border:1px solid #27ae60; padding:1px 4px; border-radius:3px; font-size:11px;"> 已卸车</span>`; break;
            case '运输中': batchBadge = `<span style="color:#3498db; border:1px solid #3498db; padding:1px 4px; border-radius:3px; font-size:11px;"> 运输中</span>`; break;
            default: batchBadge = `<span style="color:#f39c12; border:1px solid #f39c12; padding:1px 4px; border-radius:3px; font-size:11px;">${row.batchStatus}</span>`;
        }

        let typeBadge = "";
        if (row.paymentType === '现付') typeBadge = `<span style="color:#e67e22; background:#fff7e6; padding:2px 6px; border-radius:4px;"> 现付</span>`;
        else if (row.paymentType === '到付') typeBadge = `<span style="color:#2980b9; background:#e6f7ff; padding:2px 6px; border-radius:4px;"> 到付</span>`;
        else if (row.paymentType === '回单付') typeBadge = `<span style="color:#8e44ad; background:#f3e5f5; padding:2px 6px; border-radius:4px;"> 回单付</span>`;
        else typeBadge = `<span style="color:#16a085; background:#e8f8f5; padding:2px 6px; border-radius:4px;"> 月结</span>`;

        const moneyHtml = row.settlementStatus === '已结算' 
            ? `<div style="color:#27ae60; font-weight:bold; font-size:15px;">${row.totalAmount.toLocaleString()} <span style="font-size:12px">✔</span></div>`
            : `<div style="color:#e74c3c; font-weight:bold; font-size:15px;">${row.totalAmount.toLocaleString()}</div>`;

        let actionBtn = row.settlementStatus === '已结算'
            ? `<span style="color:#ccc; font-size:12px;">已转应付</span>`
            : `<button class="btn-primary" style="padding:4px 10px; font-size:12px;" onclick="sendToAP('${row.id}')">结算</button>`;

        return `
            <tr>
                <td><a href="javascript:void(0)" onclick="viewTrunkDetail('${row.id}')" style="font-weight:bold; color:#3498db;">${row.id}</a></td>
                <td>${row.branch}</td>
                <td><span style="color:#333; font-weight:500;">${row.route}</span></td>
                <td><div style="font-weight:bold;">${row.plate}</div><div style="font-size:12px; color:#666;">${row.driver}</div></td>
                <td>${batchBadge}</td>
                <td>${typeBadge}</td>
                <td style="text-align:right;">${moneyHtml}</td>
                <td style="text-align:right; font-size:12px; color:#999;"> </td>
                <td>${row.settlementStatus === '已结算' ? '<span style="color:#27ae60;">已结算</span>' : '<span style="color:#e74c3c;">待结算</span>'}</td>
                <td>${actionBtn}</td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>干线批次结算 (Trunk Settlement)</h2>
        <div class="filter-area" style="display:flex; gap:10px; margin-bottom:15px;">
            <input type="text" placeholder="批次号/车牌" style="padding:8px; border:1px solid #ccc;">
            <select style="padding:8px; border:1px solid #ccc;"><option>全部支付方式</option><option>现付</option><option>到付</option><option>回单付</option><option>月结</option></select>
            <button class="btn-primary">查询</button>
        </div>
        <table class="data-table">
            <thead><tr><th>批次号</th><th>出发网点</th><th>线路</th><th>车辆/司机</th><th>批次状态</th><th>支付方式</th><th style="text-align:right;">总运费</th><th style="text-align:right;">费用备注</th><th>结算状态</th><th>操作</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>
    `;
  }

// =========================================================================
  // 5.1 干线批次详情页 (SettlementTrunkDetail) - [全字段固定展示版]
  // =========================================================================
  else if (moduleCode === "SettlementTrunkDetail") {
      const id = window.g_currentTrunkId;
      const list = JSON.parse(sessionStorage.getItem('TrunkBatches') || "[]");
      const item = list.find(i => i.id === id);

      if (!item) {
          contentHTML += `<div style="padding:20px;"><h3>⚠️ 数据缺失</h3><button class="btn-primary" onclick="loadContent('SettlementTrunk')">返回列表</button></div>`;
      } else {
          // 1. 时间轴 (保持不变)
          const timelineHtml = item.timeline ? item.timeline.map((t, index) => {
              const isLast = index === item.timeline.length - 1;
              const color = isLast ? '#27ae60' : '#3498db';
              return `
              <div style="display:flex; margin-bottom:0;">
                  <div style="width:140px; text-align:right; padding-right:15px; color:#999; font-size:12px; padding-top:2px;">${t.time}</div>
                  <div style="position:relative; border-left:2px solid #eee; padding-left:20px; padding-bottom:20px;">
                      <div style="position:absolute; left:-6px; top:4px; width:10px; height:10px; border-radius:50%; background:${color}; border:2px solid white; box-shadow:0 0 0 1px ${color};"></div>
                      <div style="font-size:13px; color:#333; font-weight:${isLast?'bold':'normal'}">${t.event}</div>
                  </div>
              </div>`}).join('') : '';

          // ★★★ 2. 费用明细 (核心修改：全字段列举，0元留空) ★★★
          const fees = item.fees || {};
          let feeRows = "";

          // 辅助函数：如果金额>0显示金额，否则显示 "-"；说明栏同理
          const fmtVal = (val) => (val && val > 0) ? val.toLocaleString() : '-';
          const fmtDesc = (val, desc) => (val && val > 0) ? desc : '';

          // (1) 干线费
          feeRows += `
            <tr>
                <td>干线运费</td>
                <td style="text-align:right; font-weight:bold;">${fmtVal(fees.trunk)}</td>
                <td style="text-align:right; color:#999;">${fmtDesc(fees.trunk, '基础运费')}</td>
            </tr>`;

          // (2) 装车费
          feeRows += `
            <tr>
                <td>装车费</td>
                <td style="text-align:right;">${fmtVal(fees.loading)}</td>
                <td style="text-align:right; color:#999;">${fmtDesc(fees.loading, '始发操作')}</td>
            </tr>`;

          // (3) 卸车费
          feeRows += `
            <tr>
                <td>卸车费</td>
                <td style="text-align:right;">${fmtVal(fees.unloading)}</td>
                <td style="text-align:right; color:#999;">${fmtDesc(fees.unloading, '到达操作')}</td>
            </tr>`;

          // (4) 异动费用
          feeRows += `
            <tr>
                <td style="${fees.abnormal>0 ? 'color:#d35400;' : ''}">异动费用</td>
                <td style="text-align:right; ${fees.abnormal>0 ? 'color:#d35400;' : ''}">${fmtVal(fees.abnormal)}</td>
                <td style="text-align:right; color:#999;">${fmtDesc(fees.abnormal, fees.abnormalDesc)}</td>
            </tr>`;

          // (5) 其他费用
          feeRows += `
            <tr>
                <td>其他费用</td>
                <td style="text-align:right;">${fmtVal(fees.other)}</td>
                <td style="text-align:right; color:#999;">${fmtDesc(fees.other, fees.otherDesc)}</td>
            </tr>`;


          const actionBtn = item.settlementStatus === '已结算'
              ? `<button class="btn-primary" disabled style="background:#ccc; cursor:not-allowed;">已转应付</button>`
              : `<button class="btn-primary" style="background:#27ae60;" onclick="sendToAP('${item.id}')">发起结算</button>`;

          contentHTML += `
            <div style="margin-bottom:20px;">
                <button class="btn-primary" style="background:#95a5a6; padding:5px 15px;" onclick="loadContent('SettlementTrunk')"> < 返回列表</button>
                <h2 style="display:inline-block; margin-left:15px; vertical-align:middle;">批次详情：<span style="color:#2980b9;">${item.id}</span></h2>
            </div>

            <div style="display:flex; gap:20px;">
                <div style="flex:1;">
                    <div style="background:white; padding:20px; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:10px;">🚛 运输信息</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; font-size:14px;">
                            <div><label style="color:#999;">出发网点：</label> <b>${item.branch}</b></div>
                            <div><label style="color:#999;">线路：</label> <b>${item.route}</b></div>
                            <div><label style="color:#999;">状态：</label> <b style="color:#2980b9">${item.batchStatus}</b></div>
                            <div><label style="color:#999;">车牌：</label> ${item.plate}</div>
                            <div><label style="color:#999;">司机：</label> ${item.driver}</div>
                            <div><label style="color:#999;">发车时间：</label> ${item.date}</div>
                        </div>
                    </div>
                    <div style="background:white; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:10px;">📍 运输轨迹 (Tracking)</h3>
                        <div style="padding-top:10px;">${timelineHtml}</div>
                    </div>
                </div>

                <div style="flex:1; height:fit-content; background:white; padding:20px; border-radius:8px; border-top:4px solid #e67e22; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="margin-top:0;">💰 费用结算</h3>
                        <span style="padding:4px 8px; border-radius:4px; font-size:12px; ${item.settlementStatus==='已结算'?'background:#e6f7ff;color:#2980b9':'background:#fff7e6;color:#e67e22'}">
                            ${item.settlementStatus}
                        </span>
                    </div>
                    <table class="data-table">
                        <thead><tr><th>费用项目</th><th style="text-align:right">金额 (RMB)</th><th style="text-align:right">备注</th></tr></thead>
                        <tbody>
                            ${feeRows}
                            <tr style="font-weight:bold; background:#f9f9f9; border-top:2px solid #eee;">
                                <td>应付总额</td>
                                <td style="text-align:right; font-size:18px; color:#e74c3c;">${item.totalAmount.toLocaleString()}</td>
                                <td style="text-align:right;">${item.paymentType}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="margin-top:30px; text-align:right;">${actionBtn}</div>
                </div>
            </div>
          `;
      }
  }

  // =========================================================================
  // 15. 供应商付款申请 (APPaymentApply) - [增加：支付与取消逻辑]
  // =========================================================================
  else if (moduleCode === "APPaymentApply") {
    let apList = JSON.parse(sessionStorage.getItem('APApplications') || "[]");

    const rows = apList.map(row => {
        let statusHtml = "";
        let operateHtml = "";

        // 状态与按钮逻辑
        if (row.status === '已支付') {
            statusHtml = `<span style="color:#27ae60; background:#f0f9f0; padding:2px 6px; border-radius:4px;">✔ 已支付</span>`;
            operateHtml = `<button class="btn-primary" style="background:#f39c12; padding:2px 8px; font-size:12px;" onclick="revokePayment('${row.apId}')">撤销支付</button>`;
        } else {
            statusHtml = `<span style="color:#f39c12; background:#fff7e6; padding:2px 6px; border-radius:4px;">⏳ 待付款</span>`;
            operateHtml = `
                <button class="btn-primary" style="background:#27ae60; padding:2px 8px; font-size:12px;" onclick="confirmPayment('${row.apId}')">确认支付</button>
                <button class="btn-primary" style="background:#e74c3c; padding:2px 8px; font-size:12px;" onclick="cancelSettlement('${row.apId}', '${row.sourceId}')">取消结算</button>
            `;
        }

        // 判断来源文字
        let sourceType = "未知";
        if (row.sourceId.startsWith('APC')) sourceType = "干线批次";
        else if (row.sourceId.startsWith('SH')) sourceType = "短途批次"; // ★ 显示短途

        return `
            <tr>
                <td>${row.apId}</td>
                <td>
                    <a href="javascript:void(0)" onclick="jumpToSourceDetail('${row.sourceId}')" style="font-weight:bold; color:#3498db; text-decoration:underline;">
                        ${row.sourceId}
                    </a>
                    <div style="font-size:12px; color:#999;">来源: ${sourceType}</div>
                </td>
                <td>${row.payee}</td>
                <td style="text-align:right; font-weight:bold; color:#333;">${row.amount.toLocaleString()}</td>
                <td>${row.applyDate}</td>
                <td>${statusHtml}</td>
                <td>${operateHtml}</td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>应付管理 / 付款申请 (AP Management)</h2>
        <div class="filter-area" style="margin-bottom:15px;">
            <input type="text" placeholder="申请单号/源单号" style="padding:8px; border:1px solid #ccc;">
            <select style="padding:8px; border:1px solid #ccc;">
                <option>全部状态</option>
                <option>待付款</option>
                <option>已支付</option>
            </select>
            <button class="btn-primary">查询</button>
        </div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>申请单号</th><th>源单据号</th><th>收款方</th>
                    <th style="text-align:right;">应付金额</th><th>申请日期</th><th>状态</th><th>操作</th>
                </tr>
            </thead>
            <tbody>
                ${rows.length ? rows : '<tr><td colspan="7" style="text-align:center; padding:20px; color:#999;">暂无应付申请</td></tr>'}
            </tbody>
        </table>
    `;

}




// =========================================================================
  // 6. 短途批次结算 (SettlementShortHaul) - [同城配送/接送货]
  // =========================================================================
  else if (moduleCode === "SettlementShortHaul") {
    let shortBatches = JSON.parse(sessionStorage.getItem('ShortBatches'));

    // 初始化模拟数据
    if (!shortBatches || shortBatches.length < 5) {
      shortBatches = [];
      const areas = ["浦东新区配送", "徐汇-闵行专线", "虹桥机场提货", "宝山仓库-市区", "松江工业区接货"];
      const drivers = ["刘一", "陈二", "张三丰", "李小龙", "王五", "赵六", "钱七", "孙八", "周九", "吴十"];
      // 短途特有的计费模式
      const feeTypes = ["按趟计费", "按重量计费", "按票数计费"]; 

      for (let i = 1; i <= 10; i++) {
          const isSettled = i <= 3;
          const type = feeTypes[i % 3];
          
          // 模拟工作量
          const orderCount = 5 + Math.floor(Math.random() * 10); // 5-15票
          const totalWeight = 200 + Math.floor(Math.random() * 800); // 200-1000kg
          
          // 根据模式计算运费
          let baseFee = 0;
          if (type === "按趟计费") baseFee = 300;
          if (type === "按重量计费") baseFee = totalWeight * 0.8; // 0.8元/kg
          if (type === "按票数计费") baseFee = orderCount * 30;   // 30元/票

          // 杂费
          const multiPointFee = i % 2 === 0 ? 50 : 0; // 多点费
          const upstairsFee = i % 5 === 0 ? 30 : 0;   // 上楼费
          const total = Math.round(baseFee + multiPointFee + upstairsFee);

          shortBatches.push({
              id: `SH2511${i.toString().padStart(3, '0')}`,
              area: areas[i % 5],
              driver: drivers[i-1],
              plate: `沪C${8000 + i}`, // 蓝牌货车
              date: `2025-11-${10 + i}`,
              status: isSettled ? "已结算" : "待结算",
              
              // ★★★ 短途核心字段 ★★★
              workload: { count: orderCount, weight: totalWeight }, // 工作量
              feeType: type, // 计费模式
              
              totalAmount: total,
              fees: {
                  base: baseFee,
                  multiPoint: multiPointFee,
                  upstairs: upstairsFee,
                  other: 0
              }
          });
      }
      sessionStorage.setItem('ShortBatches', JSON.stringify(shortBatches));
    }

    const rows = shortBatches.map(row => {
        // 计费模式标签
        let typeBadge = "";
        if (row.feeType === '按趟计费') typeBadge = `<span style="color:#2c3e50; background:#ecf0f1; padding:2px 6px; border-radius:4px; font-size:11px;">🚚 按趟 (包车)</span>`;
        else if (row.feeType === '按重量计费') typeBadge = `<span style="color:#d35400; background:#fdebd0; padding:2px 6px; border-radius:4px; font-size:11px;">⚖️ 按重 (${row.workload.weight}kg)</span>`;
        else typeBadge = `<span style="color:#2980b9; background:#eaf2f8; padding:2px 6px; border-radius:4px; font-size:11px;">🔢 按票 (${row.workload.count}票)</span>`;

        // 金额显示
        const moneyHtml = row.status === '已结算' 
            ? `<div style="color:#27ae60; font-weight:bold;">${row.totalAmount.toLocaleString()} ✔</div>`
            : `<div style="color:#e74c3c; font-weight:bold;">${row.totalAmount.toLocaleString()}</div>`;

        // 杂费简述
        let extraStr = [];
        if(row.fees.multiPoint > 0) extraStr.push(`多点:${row.fees.multiPoint}`);
        if(row.fees.upstairs > 0) extraStr.push(`上楼:${row.fees.upstairs}`);
        const extraDesc = extraStr.length > 0 ? `<div style="font-size:11px; color:#999;">含: ${extraStr.join('+')}</div>` : '';

        const actionBtn = row.status === '已结算'
            ? `<span style="color:#ccc; font-size:12px;">已转应付</span>`
            : `<button class="btn-primary" style="padding:4px 10px; font-size:12px;" onclick="settleShortHaul('${row.id}')">结算</button>`;

        return `
            <tr>
                <td><a href="javascript:void(0)" onclick="viewShortHaulDetail('${row.id}')" style="font-weight:bold; color:#3498db;">${row.id}</a></td>
                <td>
                    <div style="font-weight:bold;">${row.area}</div>
                    <div style="font-size:12px; color:#999;">${row.date}</div>
                </td>
                <td>${row.driver} <span style="color:#ccc">|</span> ${row.plate}</td>
                <td>
                    <div style="font-weight:bold;">${row.workload.count} 票</div>
                    <div style="font-size:12px; color:#666;">${row.workload.weight} kg</div>
                </td>
                <td>${typeBadge}</td>
                <td style="text-align:right;">
                    ${moneyHtml}
                    ${extraDesc}
                </td>
                <td>
                    ${row.status === '已结算' ? '<span style="color:#27ae60;">已结算</span>' : '<span style="color:#e74c3c;">待结算</span>'}
                </td>
                <td>${actionBtn}</td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>短途批次结算 (City Delivery Settlement)</h2>
        <div class="filter-area" style="display:flex; gap:10px; margin-bottom:15px;">
            <input type="text" placeholder="批次/司机/区域" style="padding:8px; border:1px solid #ccc;">
            <select style="padding:8px; border:1px solid #ccc;"><option>全部模式</option><option>按趟</option><option>按重量</option></select>
            <select style="padding:8px; border:1px solid #ccc;"><option>全部状态</option><option>待结算</option><option>已结算</option></select>
            <button class="btn-primary">查询</button>
        </div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>短途批次号</th><th>配送区域/时间</th><th>司机/车辆</th>
                    <th>工作量 (票/重)</th><th>计费模式</th>
                    <th style="text-align:right;">应付总额 (含杂费)</th><th>状态</th><th>操作</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:10px; color:#999; font-size:12px;">
            * 提示：短途运费通常包含 <b>基础运费 + 多点费 + 上楼费</b>。
        </div>
    `;
  }

  // =========================================================================
  // 6.1 短途批次详情页 (SettlementShortHaulDetail) - [新增]
  // =========================================================================
  else if (moduleCode === "SettlementShortHaulDetail") {
      const id = window.g_currentShortId;
      const list = JSON.parse(sessionStorage.getItem('ShortBatches') || "[]");
      const item = list.find(i => i.id === id);

      if (!item) {
          contentHTML += `<div style="padding:20px;"><h3>数据丢失</h3><button class="btn-primary" onclick="loadContent('SettlementShortHaul')">返回</button></div>`;
      } else {
          // 模拟该批次下的具体订单 (Waybills)
          const mockOrders = [
              { no: "YD001", addr: "南京路步行街1号", w: 50, vol: 0.2, fee: "-" },
              { no: "YD002", addr: "陆家嘴金融中心", w: 120, vol: 0.5, fee: "-" },
              { no: "YD003", addr: "张江高科园区", w: 80, vol: 0.3, fee: "-" }
          ].map(o => `
              <tr>
                  <td>${o.no}</td>
                  <td>${o.addr}</td>
                  <td>${o.w} kg</td>
                  <td>${o.vol} m³</td>
                  <td style="color:#999;">(合并计费)</td>
              </tr>
          `).join('');

          const fees = item.fees;
          
          contentHTML += `
            <div style="margin-bottom:20px;">
                <button class="btn-primary" style="background:#95a5a6; padding:5px 15px;" onclick="loadContent('SettlementShortHaul')"> < 返回列表</button>
                <h2 style="display:inline-block; margin-left:15px; vertical-align:middle;">短途详情：<span style="color:#2980b9;">${item.id}</span></h2>
            </div>

            <div style="display:flex; gap:20px;">
                <div style="flex:2; background:white; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:10px;">📦 配送任务清单 (${item.workload.count}票)</h3>
                    <table class="data-table" style="font-size:13px;">
                        <thead><tr><th>运单号</th><th>收货地址</th><th>重量</th><th>体积</th><th>分摊运费</th></tr></thead>
                        <tbody>
                            ${mockOrders}
                            <tr><td colspan="5" style="text-align:center; color:#999;">... (此处省略其余订单) ...</td></tr>
                        </tbody>
                    </table>
                </div>

                <div style="flex:1; height:fit-content; background:white; padding:20px; border-radius:8px; border-top:4px solid #2980b9; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                     <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="margin-top:0;">💰 费用结算</h3>
                        <span style="padding:4px 8px; border-radius:4px; font-size:12px; ${item.status==='已结算'?'background:#e6f7ff;color:#2980b9':'background:#fff7e6;color:#e67e22'}">
                            ${item.status}
                        </span>
                    </div>
                    
                    <div style="margin-bottom:15px; font-size:14px; color:#555;">
                        <div>计费模式：<b>${item.feeType}</b></div>
                        <div>总工作量：<b>${item.workload.weight} kg / ${item.workload.count} 票</b></div>
                    </div>

                    <table class="data-table">
                        <thead><tr><th>费用项</th><th style="text-align:right">金额</th></tr></thead>
                        <tbody>
                            <tr><td>基础运费</td><td style="text-align:right; font-weight:bold;">${fees.base.toLocaleString()}</td></tr>
                            <tr><td>多点提送费</td><td style="text-align:right;">${fees.multiPoint}</td></tr>
                            <tr><td>上楼/搬运费</td><td style="text-align:right;">${fees.upstairs}</td></tr>
                            <tr><td>其他</td><td style="text-align:right;">${fees.other}</td></tr>
                            <tr style="font-weight:bold; background:#f9f9f9; border-top:2px solid #eee;">
                                <td>合计</td>
                                <td style="text-align:right; font-size:18px; color:#e74c3c;">${item.totalAmount.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="margin-top:30px; text-align:right;">
                         ${item.status === '已结算' 
                            ? `<button class="btn-primary" disabled style="background:#ccc;">已转应付</button>`
                            : `<button class="btn-primary" style="background:#27ae60;" onclick="settleShortHaul('${item.id}')">发起结算</button>`
                         }
                    </div>
                </div>
            </div>
          `;
      }
  }

  // =========================================================================
  // 1.4 计费规则配置 (SettlementRuleConfig) - [核心引擎]
  // =========================================================================
  else if (moduleCode === "SettlementRuleConfig") {
    const rules = [
      {
        name: "上海-北京 重货价",
        type: "收入(对客)",
        condition: "路线=沪京 & 货物=普货",
        formula: "单价 * 重量 (0.5元/kg)",
        status: "启用",
      },
      {
        name: "上海-广州 泡货价",
        type: "收入(对客)",
        condition: "路线=沪广 & 货物=轻货",
        formula: "单价 * 体积 (120元/方)",
        status: "启用",
      },
      {
        name: "自有车队-公里结算",
        type: "成本(对车)",
        condition: "车辆类型=自有",
        formula: "里程 * 4.5元/km + 路桥实报",
        status: "启用",
      },
      {
        name: "同城提送-按单算",
        type: "成本(对车)",
        condition: "短驳",
        formula: "50元/票 + 超重费",
        status: "停用",
      },
    ];

    const rows = rules
      .map(
        (r) => `
                    <tr>
                        <td style="font-weight:bold;">${r.name}</td>
                        <td><span style="font-size:12px; padding:2px 5px; background:#f5f5f5; border-radius:4px;">${
                          r.type
                        }</span></td>
                        <td style="color:#666; font-size:12px;">${
                          r.condition
                        }</td>
                        <td style="color:#2980b9;">${r.formula}</td>
                        <td>
                            <span style="color:${
                              r.status === "启用" ? "#27ae60" : "#999"
                            };">● ${r.status}</span>
                        </td>
                        <td>
                            <a href="#" style="color:#3498db;">修改</a> | 
                            <a href="#" style="color:${
                              r.status === "启用" ? "#e74c3c" : "#27ae60"
                            };">${r.status === "启用" ? "停用" : "启用"}</a>
                        </td>
                    </tr>
                `
      )
      .join("");

    contentHTML += `
                    <h2>计费规则配置  ⚙️</h2>
                    <p style="color:#7f8c8d;">配置自动计算运费的公式。系统将在运单结算时自动匹配优先级最高的规则。</p>
                    
                    <div class="action-bar" style="margin-bottom:15px; text-align:right;">
                        <button class="btn-primary" style="background-color:#27ae60;">+ 新增规则</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>规则名称</th>
                                <th>应用类型</th>
                                <th>适用条件 (路线/车型)</th>
                                <th>计费公式</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
  }

// =========================================================================
  //  网点对账 (ReconSite) - [增强版：含催办/明细/调整/自动结算方向]
  // =========================================================================
  else if (moduleCode === "ReconSite") {
    // 1. 初始化数据 (带缓存，模拟真实业务场景)
    let siteRecons = JSON.parse(sessionStorage.getItem('SiteRecons'));
    if (!siteRecons || siteRecons.length === 0) {
      siteRecons = [
        {
          id: "WD202511-001",
          name: "上海浦东金桥分部",
          type: "直营",
          period: "2025-11",
          ar: 50000.00,  // 面单费、中转费 (公司收网点)
          ap: 12000.00,  // 派送费 (公司付网点)
          // 净额 +38,000 (网点欠公司 -> 转应收)
          status: "待网点确认",
          diff: "无差异"
        },
        {
          id: "WD202511-002",
          name: "杭州余杭加盟点",
          type: "加盟",
          period: "2025-11",
          ar: 15000.00,
          ap: 48000.00,
          // 净额 -33,000 (公司欠网点 -> 转应付)
          status: "待网点确认",
          diff: "有异议"
        },
        {
          id: "WD202511-003",
          name: "苏州工业园区网点",
          type: "加盟",
          period: "2025-11",
          ar: 20000.00,
          ap: 22500.00,
          // 净额 -2,500
          status: "已确认",
          diff: "已调整"
        }
      ];
      sessionStorage.setItem('SiteRecons', JSON.stringify(siteRecons));
    }

    // 2. 渲染表格行
    const rows = siteRecons.map(r => {
        // 计算净额：应收(AR) - 应付(AP)
        const netAmount = r.ar - r.ap;
        
        // 样式逻辑
        let netStyle = "";
        let netText = "";
        if (netAmount > 0) {
            netStyle = "color:#27ae60; font-weight:bold;"; // 绿色：网点要给钱
            netText = `+${netAmount.toLocaleString()}`;
        } else if (netAmount < 0) {
            netStyle = "color:#e74c3c; font-weight:bold;"; // 红色：公司要付钱
            netText = netAmount.toLocaleString();
        } else {
            netText = "0.00";
        }

        // 操作按钮逻辑 (核心交互)
        let actions = "";
        
        if (r.status === '待网点确认') {
            // 场景：网点还没确认 -> 催办 + 调整
            actions = `
                <a href="javascript:void(0)" onclick="urgeSite('${r.id}')" style="color:#e67e22;">🔔 催办</a>
                <span style="color:#eee">|</span>
                <a href="javascript:void(0)" onclick="adjustSiteRecon('${r.id}')" style="color:#3498db;">✎ 调整</a>
            `;
        } else if (r.status === '已确认') {
            // 场景：已确认 -> 根据正负值决定生成什么单据
            if (netAmount < 0) {
                // 公司欠网点 -> 生成应付
                actions = `<button class="btn-primary" style="background:#e74c3c; padding:2px 8px; font-size:12px;" onclick="generateSiteAP('${r.id}', '${Math.abs(netAmount)}')">💸 转应付单</button>`;
            } else {
                // 网点欠公司 -> 生成应收
                actions = `<button class="btn-primary" style="background:#27ae60; padding:2px 8px; font-size:12px;" onclick="generateSiteAR('${r.id}', '${netAmount}')">💰 转应收单</button>`;
            }
        } else {
            actions = `<span style="color:#999">已完成</span>`;
        }

        return `
            <tr>
                <td><a href="javascript:void(0)" onclick="viewSiteDetail('${r.id}')" style="font-weight:bold; text-decoration:underline; color:#333;">${r.id}</a></td>
                <td>${r.name}<br><span style="font-size:12px; color:#999;">${r.type}</span></td>
                <td>${r.period}</td>
                <td style="text-align:right;">${r.ar.toLocaleString()}</td>
                <td style="text-align:right;">${r.ap.toLocaleString()}</td>
                <td style="text-align:right; background:#f9f9f9; ${netStyle}">${netText}</td>
                <td>
                    <span style="${r.status==='待网点确认'?'color:#f39c12':'color:#2980b9'}">${r.status}</span>
                </td>
                <td>${actions}</td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>网点对账 </h2>
        <p style="color: #7f8c8d;">
            全网网点资金结算中心。系统自动执行 <b>应收(面单/中转)</b> 与 <b>应付(派送/补贴)</b> 的轧差计算。
        </p>
        
        <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px; border-radius:6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="display:flex; gap:15px; flex-wrap:wrap;">
                <input type="month" value="2025-11" style="padding:8px; border:1px solid #ccc;">
                <input type="text" placeholder="网点名称/编号" style="padding:8px; border:1px solid #ccc; width:200px;">
                <select style="padding:8px; border:1px solid #ccc;">
                    <option>全部状态</option>
                    <option>待网点确认</option>
                    <option>已确认</option>
                </select>
                <button class="btn-primary">查询</button>
                <button class="btn-primary" style="background-color:#f39c12; margin-left:auto;" onclick="alert('已向 12 家未确认网点发送站内信和短信提醒！')">🔥 一键催办</button>
            </div>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>对账单号</th>
                    <th>网点信息</th>
                    <th>账期</th>
                    <th style="text-align:right;">本方应收 (RMB)<br><span style="font-size:10px; font-weight:normal;">(面单/罚款)</span></th>
                    <th style="text-align:right;">本方应付 (RMB)<br><span style="font-size:10px; font-weight:normal;">(派送费/奖励)</span></th>
                    <th style="text-align:right;">结算净额 (RMB)<br><span style="font-size:10px; font-weight:normal;">(应收 - 应付)</span></th>
                    <th>状态</th>
                    <th style="width:180px;">操作</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
  }
  
  // =========================================================================
  // 2.1 网点对账明细 (ReconSiteDetail) - [查看明细页面]
  // =========================================================================
  else if (moduleCode === "ReconSiteDetail") {
      const id = window.g_currentSiteId || "未知单号";
      contentHTML += `
        <div style="margin-bottom:15px;">
            <button class="btn-primary" style="background:#95a5a6; padding:5px 15px;" onclick="loadContent('ReconSite')"> < 返回列表</button>
            <h2 style="display:inline-block; margin-left:15px; vertical-align:middle;">对账详情：<span style="color:#2980b9;">${id}</span></h2>
        </div>
        
        <div style="display:flex; gap:20px;">
            <div style="flex:1; background:white; padding:15px; border-top:3px solid #27ae60;">
                <h3 style="color:#27ae60; margin-top:0;">📥 本方应收明细 (Income)</h3>
                <table class="data-table">
                    <thead><tr><th>费用类型</th><th>单量</th><th>金额</th></tr></thead>
                    <tbody>
                        <tr><td>电子面单费</td><td>5,000票</td><td style="text-align:right;">15,000.00</td></tr>
                        <tr><td>中转费</td><td>5,000票</td><td style="text-align:right;">5,000.00</td></tr>
                        <tr><td>遗失罚款</td><td>1票</td><td style="text-align:right;">200.00</td></tr>
                        <tr style="font-weight:bold; background:#f0f9f0;"><td>小计</td><td>-</td><td style="text-align:right;">20,200.00</td></tr>
                    </tbody>
                </table>
            </div>

            <div style="flex:1; background:white; padding:15px; border-top:3px solid #e74c3c;">
                <h3 style="color:#e74c3c; margin-top:0;">📤 本方应付明细 (Expense)</h3>
                <table class="data-table">
                    <thead><tr><th>费用类型</th><th>单量</th><th>金额</th></tr></thead>
                    <tbody>
                        <tr><td>派送费</td><td>12,000票</td><td style="text-align:right;">24,000.00</td></tr>
                        <tr><td>操作补贴</td><td>-</td><td style="text-align:right;">500.00</td></tr>
                        <tr style="font-weight:bold; background:#fff0f0;"><td>小计</td><td>-</td><td style="text-align:right;">24,500.00</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
      `;
  }


  // =========================================================================
  // 2. 客户对账 (ReconCustomer) - [修复版：独立变量]
  // =========================================================================
  else if (moduleCode === "ReconCustomer") {
    let recons = JSON.parse(sessionStorage.getItem("CustomerRecons"));
    // 强制初始化 (如果为空)
    if (!recons || recons.length < 1) {
      recons = [
        {
          id: "DZ202511-001",
          client: "阳光制造有限公司",
          period: "2025-11",
          amount: "4,700.00",
          status: "待客户确认",
          waybillCount: 2,
        },
        {
          id: "DZ202511-002",
          client: "EASY贸易公司",
          period: "2025-11",
          amount: "50,000.00",
          status: "已确认",
          waybillCount: 0,
        },
      ];
      sessionStorage.setItem("CustomerRecons", JSON.stringify(recons));
    }

    // 注意：这里使用的是 recons 变量
    const rows = recons
      .map((r) => {
        let statusColor = "#333";
        let action = "";

        if (r.status === "待客户确认") {
          statusColor = "#f39c12";
          action = `<a href="javascript:void(0)" onclick="confirmRecon('${r.id}')" style="color:#27ae60; font-weight:bold;">模拟确认</a>`;
        } else if (r.status === "已确认") {
          statusColor = "#27ae60";
          action = `<button onclick="applyInvoiceFromRecon('${r.id}', '${r.client}', '${r.amount}')" class="btn-primary" style="padding:4px 8px; font-size:12px;">申请开票</button>`;
        } else if (r.status === "已开票") {
          statusColor = "#2980b9";
          action = `<span style="color:#999;">已开票</span>`;
        } else {
          statusColor = "#999";
          action = `<span style="color:#ccc;">流程结束</span>`;
        }

        return `<tr>
                        <td>
                            <a href="javascript:void(0)" onclick="viewReconDetails('${
                              r.id
                            }')" style="color:#3498db; font-weight:bold; text-decoration:underline;">${
          r.id
        }</a>
                            <span style="font-size:12px; color:#999; margin-left:5px;">(${
                              r.waybillCount || "-"
                            }单)</span>
                        </td>
                        <td>${r.client}</td>
                        <td>${r.period}</td>
                        <td style="text-align:right; font-weight:bold;">${
                          r.amount
                        }</td>
                        <td><span style="color:${statusColor}; font-weight:bold;">${
          r.status
        }</span></td>
                        <td>${action}</td>
                    </tr>`;
      })
      .join("");

    contentHTML += `
                    <h2>客户对账 </h2>
                    <div class="filter-area" style="background:white;padding:15px;margin-bottom:20px;">
                        <button class="btn-primary" onclick="loadContent('ReconCustomer')">刷新列表</button>
                    </div>
                    <table class="data-table">
                        <thead><tr><th>对账单号 (点击查看运单明细)</th><th>客户名称</th><th>对账期间</th><th style="text-align:right;">应收金额</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
  }

    // =========================================================================
    // 2.1. 对账单详情页 (ReconDetail) - [新增：表格化明细]
    // =========================================================================
    else if (moduleCode === 'ReconDetail') {
        // 1. 获取当前要查看的对账单对象
        const recon = window.g_currentRecon || { id: '-', client: '-', amount: '0', period: '-' };

        // 2. 从运单库查找关联的运单 (这是核心：根据 reconId 筛选)
        const allWaybills = JSON.parse(sessionStorage.getItem('BizWaybills') || "[]");
        
        // 筛选逻辑：只找 reconId 等于当前对账单号的运单
        const details = allWaybills.filter(w => w.reconId === recon.id);

        // 3. 生成明细行 HTML
        const rows = details.map((d, index) => {
            // 简单的负数判断 (退款标红)
            const amtNum = parseFloat(d.totalAmount ? d.totalAmount.replace(/,/g, '') : "0");
            const isRefund = amtNum < 0;
            const color = isRefund ? '#c0392b' : '#333';
            const typeLabel = isRefund ? '<span style="color:red; font-weight:bold;">[退款]</span> ' : '';

            return `
                <tr style="color:${color}; background-color: ${isRefund ? '#fff0f0' : '#fff'};">
                    <td>${index + 1}</td>
                    <td><strong>${d.id}</strong></td>
                    <td>${d.bizDate || '-'}</td>
                    <td>${d.route || '常规路线'}</td>
                    <td>${typeLabel}${d.goods || '普通货物'}</td>
                    <td>${d.weight || '-'}</td>
                    <td style="text-align:right; font-weight:bold;">${d.totalAmount || d.amount}</td>
                    <td>${d.status}</td>
                </tr>
            `;
        }).join('');

        const emptyRow = rows ? '' : '<tr><td colspan="8" style="text-align:center; padding:20px; color:#999;">暂无关联运单明细，请检查数据源。</td></tr>';

        contentHTML += `
            <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; gap:10px; align-items:center;">
                    <button class="btn-primary" style="background-color: #95a5a6;" onclick="loadContent('ReconCustomer')"> < 返回列表</button>
                    <h2>对账单详情：<span style="color:#2980b9;">${recon.id}</span></h2>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:14px; color:#666;">客户名称</div>
                    <div style="font-weight:bold; font-size:16px;">${recon.client}</div>
                </div>
            </div>

            <div class="filter-area" style="background:white; padding:20px; margin-bottom:20px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; border-left: 5px solid #2980b9;">
                <div>
                    <span style="font-weight:bold; font-size:18px;">本单总额：<span style="color:#e74c3c; font-family:'Courier New';">${recon.amount}</span> RMB</span>
                    <span style="margin-left:20px; color:#666;">| &nbsp; 账期：${recon.period} &nbsp; | &nbsp; 包含单据：<strong>${details.length}</strong> 笔</span>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="btn-primary" style="background-color:#27ae60;" onclick="alert('模拟：正在导出 Excel...')">📥 导出 Excel</button>
                    <button class="btn-primary" style="background-color:#34495e;" onclick="window.print()">🖨 打印清单</button>
                </div>
            </div>

            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width:50px;">序号</th>
                        <th>运单号</th>
                        <th>业务日期</th>
                        <th>运输路线</th>
                        <th>货物名称</th>
                        <th>计费重量/单位</th>
                        <th style="text-align:right;">应收金额 (RMB)</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                    ${emptyRow}
                </tbody>
            </table>
        `;
    }


  // =========================================================================
  // 3. 承运商对账 (ReconCarrier)
  // =========================================================================
  else if (moduleCode === "ReconCarrier") {
    contentHTML += `
                    <h2>承运商对账</h2>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="承运商名称/编号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">对账状态 (全部)</option>
                                <option>待核算</option>
                                <option>待承运商确认</option>
                                <option>已确认</option>
                            </select>
                            <input type="date" placeholder="批次日期范围" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <button class="btn-primary">查询</button>
                            <button class="btn-primary" style="background-color: #2980b9;">生成对账单</button>
                        </div>
                    </div>
                    
                    <h3>承运商对账单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>对账单号</th>
                                <th>承运商名称</th>
                                <th>批次数量</th>
                                <th>应付总额 (RMB)</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DZ202511-CY003</td>
                                <td>迅达快运</td>
                                <td>10</td>
                                <td>125,000.00</td>
                                <td><span style="color: #f39c12;">待承运商确认</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a> | <a href="#" style="color:#e74c3c;">催办</a></td>
                            </tr>
                            <tr>
                                <td>DZ202510-CY001</td>
                                <td>远航物流</td>
                                <td>8</td>
                                <td>90,000.00</td>
                                <td><span style="color: #27ae60;">已确认</span></td>
                                <td><a href="#" style="color:#3498db;">转应付</a> | <a href="#" style="color:#34495e;">打印</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 4. 司机对账 (ReconDriver)
  // =========================================================================
  else if (moduleCode === "ReconDriver") {
    contentHTML += `
                    <h2>司机对账 (酬金/费用)</h2>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="司机姓名/工号/手机号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">对账类型 (全部)</option>
                                <option>酬金结算</option>
                                <option>报销费用</option>
                            </select>
                            <input type="date" placeholder="结算周期" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <h3>司机结算单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>结算单号</th>
                                <th>司机姓名</th>
                                <th>结算周期</th>
                                <th>结算类型</th>
                                <th>应付金额 (RMB)</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>JS202511-SJ020</td>
                                <td>李师傅</td>
                                <td>2025-11-01 ~ 11-15</td>
                                <td>酬金结算</td>
                                <td>4,500.00</td>
                                <td><span style="color: #f39c12;">待支付</span></td>
                                <td><a href="#" style="color:#27ae60;">转支付</a> | <a href="#" style="color:#3498db;">详情</a></td>
                            </tr>
                            <tr>
                                <td>JS202511-SJ021</td>
                                <td>王师傅</td>
                                <td>2025-11-01 ~ 11-15</td>
                                <td>报销费用</td>
                                <td>800.00</td>
                                <td><span style="color: #c0392b;">待审批</span></td>
                                <td><a href="#" style="color:#e74c3c;">审批</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 5. 对账差异处理 (ReconDiffHandle)
  // =========================================================================
  else if (moduleCode === "ReconDiffHandle") {
    contentHTML += `
                    <h2>对账差异处理</h2>
                    <p style="color: #7f8c8d;">集中处理所有对账单中，系统记录与外部对象反馈存在不一致的差异记录。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">对账对象类型</option>
                                <option>客户</option>
                                <option>网点</option>
                                <option>承运商</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">差异处理状态</option>
                                <option>待财务分析</option>
                                <option>待对方确认</option>
                                <option>已核销</option>
                            </select>
                            <button class="btn-primary">查询差异</button>
                        </div>
                    </div>

                    <h3>差异记录列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>对账单号</th>
                                <th>差异对象</th>
                                <th>差异金额 (RMB)</th>
                                <th>差异类型</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DZ202510-KH005</td>
                                <td>阳光制造 (客户)</td>
                                <td>+350.00</td>
                                <td>运费计算错误</td>
                                <td><span style="color: #f39c12;">待财务分析</span></td>
                                <td><a href="#" style="color:#e74c3c;">分析/调整</a> | <a href="#" style="color:#3498db;">详情</a></td>
                            </tr>
                            <tr>
                                <td>DZ202510-WD002</td>
                                <td>广州白云网点</td>
                                <td>-100.00</td>
                                <td>代收货款遗漏</td>
                                <td><span style="color: #27ae60;">已核销</span></td>
                                <td><a href="#" style="color:#3498db;">查看记录</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 3. 客户对账单列表 (ARCustomerStatement) - [升级版：接收应收数据]
  // =========================================================================
  else if (moduleCode === "ARCustomerStatement") {
    // 1. 读取数据源 (来自客户对账模块的推送)
    let arList = JSON.parse(sessionStorage.getItem("ARStatements"));

    // 2. 如果没数据，初始化一些老数据撑场面 (模拟期初)
    if (!arList) {
      arList = [
        {
          id: "DZ202510-001",
          client: "老客户A",
          period: "2025-10",
          amount: "50,000.00",
          verified: "50,000.00",
          unverified: "0.00",
          status: "已核销",
        },
        {
          id: "DZ202510-002",
          client: "老客户B",
          period: "2025-10",
          amount: "20,000.00",
          verified: "10,000.00",
          unverified: "10,000.00",
          status: "部分核销",
        },
      ];
      sessionStorage.setItem("ARStatements", JSON.stringify(arList));
    }

    // 3. 生成表格行
    const rows = arList
      .map((item) => {
        let statusColor = "#333";
        let action = "";

        // 根据核销状态显示不同颜色和按钮
        if (item.status === "未核销") {
          statusColor = "#e74c3c"; // 红色：催款重点
          // 点击跳转到核销页面，并带上单号
          action = `<a href="javascript:void(0)" onclick="goToVerify('${item.id}')" style="color:#27ae60; font-weight:bold;">收款核销</a>`;
        } else if (item.status === "部分核销") {
          statusColor = "#f39c12"; // 黄色
          action = `<a href="javascript:void(0)" onclick="goToVerify('${item.id}')" style="color:#27ae60;">继续核销</a>`;
        } else {
          statusColor = "#999"; // 灰色
          action = `<span style="color:#ccc;">查看详情</span>`;
        }

        return `<tr>
                        <td>${item.id}</td>
                        <td>${item.client}</td>
                        <td>${item.period}</td>
                        <td style="text-align:right; font-weight:bold;">${item.amount}</td>
                        <td style="text-align:right; color:#27ae60;">${item.verified}</td>
                        <td style="text-align:right; color:#e74c3c;">${item.unverified}</td>
                        <td><span style="color:${statusColor}; font-weight:bold;">${item.status}</span></td>
                        <td>${action}</td>
                    </tr>`;
      })
      .join("");

    contentHTML += `
                    <h2>客户对账单列表 (应收台账)</h2>
                    <p style="color: #7f8c8d;">应收管理的核心报表。此处列出所有【已确认】的对账单，等待财务收款核销。</p>
                    
                    <div class="filter-area" style="background:white;padding:15px;margin-bottom:20px;">
                        <div style="display: flex; gap: 15px;">
                            <input type="text" placeholder="对账单号/客户" style="padding:8px; border:1px solid #ccc;">
                            <select style="padding:8px; border:1px solid #ccc;">
                                <option>未核销</option>
                                <option>已核销</option>
                            </select>
                            <button class="btn-primary" onclick="loadContent('ARCustomerStatement')">刷新列表</button>
                        </div>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>对账单号</th>
                                <th>客户名称</th>
                                <th>账期</th>
                                <th style="text-align:right;">应收总额</th>
                                <th style="text-align:right;">已核销</th>
                                <th style="text-align:right;">待核销</th>
                                <th>核销状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 5. 预收款单 (AR Precollection)
  // =========================================================================
  else if (moduleCode === "ARPrecollection") {
    contentHTML += `
                    <h2>预收款单</h2>
                    <p style="color: #7f8c8d;">管理客户提前支付的款项，这些款项将在后续运单结算时用于核销应收款。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="预收款单号 / 客户名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">核销状态 (全部)</option>
                                <option>未核销</option>
                                <option>部分核销</option>
                                <option>已核销</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增预收款单</button>
                    </div>

                    <h3>预收款单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>预收款单号</th>
                                <th>客户名称</th>
                                <th>预收金额 (RMB)</th>
                                <th>已核销金额 (RMB)</th>
                                <th>可用余额 (RMB)</th>
                                <th>核销状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>YSD202511001</td>
                                <td>北方物流</td>
                                <td>50,000.00</td>
                                <td>15,000.00</td>
                                <td>35,000.00</td>
                                <td><span style="color: #f39c12;">部分核销</span></td>
                                <td><a href="#" style="color:#3498db;">查看/核销</a></td>
                            </tr>
                            <tr>
                                <td>YSD202510002</td>
                                <td>华南科技</td>
                                <td>10,000.00</td>
                                <td>0.00</td>
                                <td>10,000.00</td>
                                <td><span style="color: #c0392b;">未核销</span></td>
                                <td><a href="#" style="color:#3498db;">查看/核销</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 6. 客户收款核销 (ARCollectionVerify) - [终极闭环：收钱消账]
  // =========================================================================
  else if (moduleCode === "ARCollectionVerify") {
    // 1. 读取待核销的应收账款
    const arList = JSON.parse(sessionStorage.getItem("ARStatements") || "[]");
    const targetId = sessionStorage.getItem("TargetVerifyBill"); // 获取刚才跳转过来的目标ID

    // 2. 过滤出未核销的，并生成表格
    const rows = arList
      .filter((item) => item.status !== "已核销")
      .map((item) => {
        // 如果是刚才点的单子，给个高亮背景
        const isTarget = item.id === targetId;
        const bgStyle = isTarget
          ? "background-color: #e6f7ff; border: 2px solid #1890ff;"
          : "";
        const action = `<button class="btn-primary" style="padding:4px 10px;" onclick="executeVerify('${item.id}', '${item.amount}', '${item.client}')">确认到账并核销</button>`;

        return `
                        <tr style="${bgStyle}">
                            <td>${item.id} ${
          isTarget
            ? '<span style="color:red;font-size:12px;">(当前处理)</span>'
            : ""
        }</td>
                            <td>${item.client}</td>
                            <td>${item.period}</td>
                            <td style="text-align:right; font-weight:bold;">${
                              item.amount
                            }</td>
                            <td style="text-align:right; color:#e74c3c;">${
                              item.unverified
                            }</td>
                            <td><span style="color: #f39c12;">待核销</span></td>
                            <td>${action}</td>
                        </tr>
                    `;
      })
      .join("");

    contentHTML += `
                    <h2>客户收款核销 </h2>
                    <p style="color: #7f8c8d;">财务/出纳在此确认银行流水，并将其与应收账款进行匹配消账。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <span style="font-weight:bold;">银行账户：</span>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                                <option>工行基本户 (****8888)</option>
                                <option>支付宝企业户</option>
                            </select>
                            <button class="btn-primary" onclick="alert('模拟：已拉取最新银行流水')">📥 拉取银行流水</button>
                        </div>
                    </div>

                    <h3>待核销应收列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>对账单号</th>
                                <th>客户名称</th>
                                <th>账期</th>
                                <th style="text-align:right;">应收金额</th>
                                <th style="text-align:right;">待核销余额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                              rows.length > 0
                                ? rows
                                : '<tr><td colspan="7" style="text-align:center; color:#ccc; padding:20px;">没有待核销的款项，真棒！👏</td></tr>'
                            }
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 7. 客户账龄分析 (AR Age Analysis)
  // =========================================================================
  else if (moduleCode === "ARAgeAnalysis") {
    contentHTML += `
                    <h2>客户账龄分析</h2>
                    <p style="color: #7f8c8d;">分析应收账款的账期分布，帮助管理层识别坏账风险。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="客户名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">截止日期 (本月)</option>
                                <option>上月</option>
                                <option>本季度</option>
                            </select>
                            <button class="btn-primary">查询</button>
                            <button style="background-color: #34495e; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer;">生成分析报表</button>
                        </div>
                    </div>
                    
                    <h3>应收账款账龄分布 (截止 2025-11-30)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>客户名称</th>
                                <th>总应收 (RMB)</th>
                                <th>< 30天 (RMB)</th>
                                <th>30-60天 (RMB)</th>
                                <th>60-90天 (RMB)</th>
                                <th>> 90天 (RMB)</th>
                                <th>风险等级</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>阳光制造</td>
                                <td>35,000.00</td>
                                <td>15,000.00</td>
                                <td>10,000.00</td>
                                <td>5,000.00</td>
                                <td>5,000.00</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">高</span></td>
                            </tr>
                            <tr>
                                <td>远景贸易</td>
                                <td>12,000.00</td>
                                <td>12,000.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td><span style="color: #27ae60;">低</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top: 15px; color: #7f8c8d;">* 图表区域（饼图或柱状图）可在此处展示。</p>
                `;
  }
  


  // =========================================================================
  // 9. 预付款单 (AP Prepayment)
  // =========================================================================
  else if (moduleCode === "APPrepayment") {
    contentHTML += `
                    <h2>预付款单</h2>
                    <p style="color: #7f8c8d;">管理向供应商预先支付的款项，这些款项将在后续应付账款发生时用于核销。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="预付款单号 / 供应商名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">核销状态 (全部)</option>
                                <option>未核销</option>
                                <option>部分核销</option>
                                <option>已核销</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增预付款单</button>
                    </div>

                    <h3>预付款单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>预付款单号</th>
                                <th>供应商名称</th>
                                <th>预付金额 (RMB)</th>
                                <th>已核销金额 (RMB)</th>
                                <th>可用余额 (RMB)</th>
                                <th>核销状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>YFD202511001</td>
                                <td>华北燃油</td>
                                <td>100,000.00</td>
                                <td>25,000.00</td>
                                <td>75,000.00</td>
                                <td><span style="color: #f39c12;">部分核销</span></td>
                                <td><a href="#" style="color:#3498db;">查看/核销</a></td>
                            </tr>
                            <tr>
                                <td>YFD202510002</td>
                                <td>南方设备</td>
                                <td>50,000.00</td>
                                <td>0.00</td>
                                <td>50,000.00</td>
                                <td><span style="color: #c0392b;">未核销</span></td>
                                <td><a href="#" style="color:#3498db;">查看/核销</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 10. 付款核销 (AP Payment Verify)
  // =========================================================================
  else if (moduleCode === "APPaymentVerify") {
    contentHTML += `
                    <h2>付款核销</h2>
                    <p style="color: #7f8c8d;">将实际发生的银行付款流水与已批准的应付单据（应付账款、预付款）进行匹配和核销。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="付款流水号 / 供应商名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">核销状态 (全部)</option>
                                <option>待核销</option>
                                <option>已核销</option>
                            </select>
                            <input type="date" placeholder="付款日期" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #3498db;">批量自动匹配核销</button>
                    </div>

                    <h3>待核销付款流水</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>银行流水号</th>
                                <th>供应商名称</th>
                                <th>付款金额 (RMB)</th>
                                <th>已核销金额 (RMB)</th>
                                <th>待核销余额 (RMB)</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>FK202511010</td>
                                <td>甲承运商</td>
                                <td>18,500.00</td>
                                <td>0.00</td>
                                <td>18,500.00</td>
                                <td><a href="#" style="color:#27ae60;">立即核销</a></td>
                            </tr>
                            <tr>
                                <td>FK202511011</td>
                                <td>某设备租赁</td>
                                <td>5,000.00</td>
                                <td>5,000.00</td>
                                <td>0.00</td>
                                <td><a href="#" style="color:#3498db;">查看核销记录</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

// =========================================================================
  // 18. 供应商发票管理/进项台账 (APInvoiceManage) - [核心：OCR与认证抵扣]
  // =========================================================================
  else if (moduleCode === "APInvoiceManage") {
    // 1. 初始化模拟数据 (模拟从税务局底账库同步的数据)
    let inputInvoices = JSON.parse(sessionStorage.getItem('InputInvoices'));
    if (!inputInvoices || inputInvoices.length === 0) {
      inputInvoices = [
        {
          id: "INV-IN-20251101",
          code: "3100193130",
          number: "18902233",
          supplier: "中国石化销售有限公司",
          type: "专票",
          rate: "13%",
          amount: 5000.00, // 不含税
          tax: 650.00,     // 税额
          total: 5650.00,  // 价税合计
          date: "2025-11-01",
          status: "未认证", // 状态流：未认证 -> 已认证 -> 已抵扣
          risk: "正常"
        },
        {
          id: "INV-IN-20251102",
          code: "1100192240",
          number: "22093344",
          supplier: "顺丰速运有限公司",
          type: "专票",
          rate: "9%",
          amount: 2000.00,
          tax: 180.00,
          total: 2180.00,
          date: "2025-11-05",
          status: "已认证",
          risk: "正常"
        },
        {
          id: "INV-IN-20251103",
          code: "4400183320",
          number: "88990011",
          supplier: "某不知名耗材店",
          type: "普票",
          rate: "1%",
          amount: 300.00,
          tax: 3.00,
          total: 303.00,
          date: "2025-11-10",
          status: "无需认证", // 普票不能抵扣
          risk: "重复报销疑点" // 风控标识
        }
      ];
      sessionStorage.setItem('InputInvoices', JSON.stringify(inputInvoices));
    }

    // 2. 渲染列表
    const rows = inputInvoices.map(inv => {
        // 状态徽标颜色
        let statusBadge = "";
        if (inv.status === '已认证') statusBadge = `<span class="badge badge-success">✔ 已认证</span>`;
        else if (inv.status === '未认证') statusBadge = `<span class="badge badge-warning" style="cursor:pointer;" onclick="verifyInvoice('${inv.id}')">⏳ 点击认证</span>`;
        else statusBadge = `<span class="badge" style="background:#eee; color:#999;">${inv.status}</span>`;

        // 风险提示
        let riskTag = "";
        if (inv.risk !== '正常') {
            riskTag = `<span style="color:#e74c3c; font-size:12px;">⚠️ ${inv.risk}</span>`;
        } else {
            riskTag = `<span style="color:#27ae60; font-size:12px;">🛡️ 验真通过</span>`;
        }

        // 按钮交互
        const actionBtn = inv.status === '未认证' 
            ? `<button class="btn-primary" style="padding:2px 8px; font-size:12px;" onclick="verifyInvoice('${inv.id}')">联网查验</button>`
            : `<button class="btn-primary" style="background:#fff; color:#333; border:1px solid #ccc; padding:2px 8px; font-size:12px;" onclick="viewInvoiceImg('${inv.number}')">查看影像</button>`;

        return `
            <tr>
                <td>
                    <div style="font-weight:bold; color:#3498db;">${inv.number}</div>
                    <div style="font-size:12px; color:#999;">代码: ${inv.code}</div>
                </td>
                <td>
                    <div style="font-weight:bold;">${inv.supplier}</div>
                    <div style="font-size:12px;">${inv.date} | ${inv.type}</div>
                </td>
                <td style="text-align:right;">${inv.amount.toLocaleString()}</td>
                <td style="text-align:right; color:#27ae60;">${inv.tax.toLocaleString()}</td>
                <td style="text-align:right; font-weight:bold;">${inv.total.toLocaleString()}</td>
                <td>${statusBadge}<br>${riskTag}</td>
                <td>${actionBtn}</td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>进项发票台账  🧾</h2>
        <p style="color: #7f8c8d;">
            全员报销与供应商结算的发票归集中心。支持 <b>OCR智能识票</b>、<b>国税联网验真</b> 及 <b>进项税额抵扣</b> 统计。
        </p>

        <div class="dashboard-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:20px;">
            <div class="kpi-card" style="border-left: 4px solid #3498db;">
                <div class="kpi-title">📅 本月认证税额 (抵扣)</div>
                <div class="kpi-value" style="color:#3498db;">830.00</div>
                <div class="kpi-trend">预计节省税金</div>
            </div>
            <div class="kpi-card" style="border-left: 4px solid #f39c12;">
                <div class="kpi-title">⏳ 待认证发票</div>
                <div class="kpi-value" style="color:#f39c12;">1 张</div>
                <div class="kpi-trend">涉及税额 650.00</div>
            </div>
            <div class="kpi-card" style="border-left: 4px solid #27ae60;">
                <div class="kpi-title">📥 票夹总张数</div>
                <div class="kpi-value">142</div>
                <div class="kpi-trend">电子票占比 85%</div>
            </div>
            <div class="kpi-card" style="border-left: 4px solid #e74c3c;">
                <div class="kpi-title">⚠️ 风险/红字发票</div>
                <div class="kpi-value" style="color:#e74c3c;">2</div>
                <div class="kpi-trend">重复报销拦截</div>
            </div>
        </div>

        <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px; border-radius:6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; gap:10px;">
                    <input type="text" placeholder="发票号码/代码" style="padding:8px; border:1px solid #ccc; width:150px;">
                    <input type="text" placeholder="销方名称" style="padding:8px; border:1px solid #ccc; width:150px;">
                    <select style="padding:8px; border:1px solid #ccc;">
                        <option>全部状态</option>
                        <option>未认证</option>
                        <option>已认证</option>
                        <option>异常/作废</option>
                    </select>
                    <button class="btn-primary">🔍 查询</button>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="btn-primary" style="background:#8e44ad;" onclick="simulateOCR()">📸 OCR 拍照识票</button>
                    <button class="btn-primary" style="background:#27ae60;">📥 批量导入 (OFD/PDF)</button>
                    <button class="btn-primary" style="background:#fff; color:#333; border:1px solid #ccc;">导出台账</button>
                </div>
            </div>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>发票号码/代码</th>
                    <th>销方信息</th>
                    <th style="text-align:right;">金额 (不含税)</th>
                    <th style="text-align:right;">税额 (抵扣额)</th>
                    <th style="text-align:right;">价税合计</th>
                    <th>验真/认证状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>

        <div id="ocr-upload-zone" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999;">
            <div style="background:white; width:500px; margin:100px auto; padding:30px; border-radius:8px; text-align:center;">
                <h3>📸 智能票据识别</h3>
                <div style="border:2px dashed #ccc; padding:40px; margin:20px 0; background:#f9f9f9;">
                    <p style="color:#999;">拖拽发票文件(PDF/JPG/OFD)到此处</p>
                    <p>或</p>
                    <button class="btn-primary">选择文件</button>
                </div>
                <div id="ocr-progress" style="display:none; margin-top:20px;">
                    <p>正在连接国税底账库查验...</p>
                    <div style="width:100%; height:10px; background:#eee; border-radius:5px; overflow:hidden;">
                        <div style="width:60%; height:100%; background:#3498db;"></div>
                    </div>
                </div>
                <button class="btn-primary" style="background:#999; margin-top:20px;" onclick="closeOCR()">取消</button>
            </div>
        </div>
    `;
  }
  
  
// =========================================================================
  // 22. 收款与付款执行 (FundExecution) - [UI不变，逻辑匹配]
  // =========================================================================
  else if (moduleCode === "FundExecution") {
    let vouchers = JSON.parse(sessionStorage.getItem('FinanceVouchers') || "[]");
    // 过滤出收款单
    const receipts = vouchers.filter(v => v.type === '收款');

    const receiptRows = receipts.map(r => {
        let statusHtml = "";
        let actionHtml = "";

        // ★★★ 状态显示逻辑 ★★★
        if (r.status === '待审核') {
            // 刚录入的收款单，需要审核
            statusHtml = `<span style="color:#f39c12; font-weight:bold;">⏳ 待审核</span>`;
            actionHtml = `<button class="btn-primary" style="padding:2px 8px; font-size:12px; background:#27ae60;" onclick="auditVoucher('${r.id}')">审核通过</button>`;
        } 
        else if (r.status === '已审核') {
            // 审核过了，等待去客户账户充值使用
            statusHtml = `<span style="color:#3498db; font-weight:bold;">🛡️ 已审核</span>`;
            actionHtml = `<span style="color:#999; font-size:12px;">待关联充值</span>`;
        } 
        else if (r.status === '已入账') {
            // 已经充值完了，闭环
            statusHtml = `<span style="color:#27ae60; font-weight:bold;">✔ 已入账</span>`;
            actionHtml = `<span style="color:#ccc; font-size:12px;">流程结束</span>`;
        }

        return `
            <tr>
                <td>${r.id}</td>
                <td>${r.date}</td>
                <td>${r.target}</td>
                <td style="text-align:right; font-weight:bold;">${r.amount.toLocaleString()}</td>
                <td>${r.method}</td>
                <td>${statusHtml}</td>
                <td>${actionHtml}</td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>出纳执行台 / 凭证录入 (Cashier Desk)</h2>
        <div style="background:#e8f8f5; padding:10px; border-radius:4px; margin-bottom:15px; border:1px solid #27ae60;">
            <b>当前流程：</b> 1.录入收款单(待审核) -> 2.点击审核(已审核) -> 3.去客户资金账户关联充值
        </div>

        <div style="margin-bottom:20px;">
            <button class="btn-primary" onclick="showVoucherForm('receipt')">➕ 新增收款凭证</button>
        </div>

        <div style="background:white; padding:15px; border-radius:8px; border-top:4px solid #27ae60; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
            <h3 style="margin-top:0;">📥 收款凭证列表</h3>
            <table class="data-table">
                <thead><tr><th>凭证号</th><th>日期</th><th>付款方</th><th>金额</th><th>方式</th><th>状态</th><th>操作</th></tr></thead>
                <tbody>${receiptRows || '<tr><td colspan="7" style="text-align:center;color:#ccc">暂无记录</td></tr>'}</tbody>
            </table>
        </div>

        <div id="voucherModal" style="display:none; position:fixed; top:20%; left:30%; width:40%; background:white; border:1px solid #ccc; padding:20px; box-shadow:0 5px 15px rgba(0,0,0,0.2); z-index:100;">
            <h3 style="color:#27ae60">录入收款凭证</h3>
            <div style="margin-bottom:10px;">
                <label>付款方摘要：</label>
                <input type="text" id="v_target" placeholder="例如：京东物流打款" style="width:100%; padding:5px;">
            </div>
            <div style="margin-bottom:10px;">
                <label>凭证金额：</label>
                <input type="number" id="v_amount" placeholder="0.00" style="width:100%; padding:5px;">
            </div>
            <div style="text-align:right; margin-top:20px;">
                <button onclick="document.getElementById('voucherModal').style.display='none'">取消</button>
                <button class="btn-primary" onclick="submitVoucher()">提交</button>
            </div>
            <input type="hidden" id="v_type" value="receipt">
        </div>
    `;
  }

  // =========================================================================
  // 19. 客户资金账户 (FundCustomerAcct) - [读取已审核数据]
  // =========================================================================
  else if (moduleCode === "FundCustomerAcct") {
    let accounts = JSON.parse(sessionStorage.getItem('CustomerAccounts') || "[]");
    
    // 初始化账户数据 (保持不变)
    if (accounts.length === 0) {
        accounts = [
            { id: "C001", name: "京东物流", balance: 50000, credit: 100000, lastUpdate: "2025-11-20" },
            { id: "C002", name: "顺丰速运", balance: 12000, credit: 50000, lastUpdate: "2025-11-22" }
        ];
        sessionStorage.setItem('CustomerAccounts', JSON.stringify(accounts));
    }

    // ★★★★★ 核心修复开始 ★★★★★
    
    // 1. 读取出纳系统的凭证 (FinanceVouchers)
    let cashierVouchers = JSON.parse(sessionStorage.getItem('FinanceVouchers') || "[]");
    
    // 2. 读取会计系统的凭证 (ManualVouchers) - 就是你截图里那个列表
    let financeVouchers = JSON.parse(sessionStorage.getItem('ManualVouchers') || "[]");

    // 3. 合并并筛选
    let availableVouchers = [];

    // 筛选出纳凭证 (条件：类型=收款 且 状态=已审核)
    cashierVouchers.forEach(v => {
        if (v.type === '收款' && v.status === '已审核') {
            // 统一数据格式，因为两边的字段可能略有不同
            availableVouchers.push({
                id: v.id,
                amount: v.amount,
                target: v.target || "未知付款方",
                sourceType: "出纳台"
            });
        }
    });

    // 筛选会计凭证 (条件：类型包含"收款" 且 状态=已审核或已记账)
    financeVouchers.forEach(v => {
        // voucher.js 保存的 type 可能是 "收款凭证"，所以用 includes 判断
        // status 可能是 "已审核" 或 "已记账"
        const isReceipt = v.type && v.type.includes('收款'); 
        const isAudited = v.status === '已审核' || v.status === '已记账';

        if (isReceipt && isAudited) {
             // 这里的 v.target 在会计凭证里可能没有，需要用摘要(lines[0].summary)代替
             const summary = (v.lines && v.lines[0]) ? v.lines[0].summary : "手动凭证";
             availableVouchers.push({
                id: v.id,
                amount: v.amount, // 注意：ManualVouchers存的是字符串，可能需要 parseFloat，但显示时字符串也行
                target: summary,
                sourceType: "会计端"
            });
        }
    });

    // ★★★★★ 核心修复结束 ★★★★★

    let voucherOptions = `<option value="">-- 请选择关联的收款凭证 --</option>`;
    availableVouchers.forEach(v => {
        // data-amount 用于后续校验
        voucherOptions += `<option value="${v.id}" data-amount="${v.amount}">[${v.sourceType}] ${v.id} | ¥${v.amount} | ${v.target}</option>`;
    });

    const rows = accounts.map(acc => `
        <tr>
            <td>${acc.id}</td>
            <td><b>${acc.name}</b></td>
            <td style="text-align:right; font-size:16px; color:#27ae60; font-weight:bold;">${acc.balance.toLocaleString()}</td>
            <td>${acc.lastUpdate}</td>
            <td>
                <button class="btn-primary" style="padding:2px 8px; background:#f39c12;" onclick="openTopUpVerifyModal('${acc.id}', '${acc.name}')">充值入账</button>
            </td>
        </tr>
    `).join('');

    contentHTML += `
        <h2>客户资金账户 (Customer Fund Accounts)</h2>
        <div style="background:#e8f8f5; padding:10px; border-radius:4px; margin-bottom:15px; border:1px solid #27ae60;">
            <b>关联说明：</b> 只有在【出纳台】<b>审核通过</b>的收款凭证，才会显示在下方的充值选项中。
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>客户编码</th><th>客户名称</th><th style="text-align:right;">当前余额</th><th>最后变动</th><th>操作</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>

        <div id="topUpModal" style="display:none; position:fixed; top:20%; left:30%; width:40%; background:white; border:1px solid #ccc; padding:20px; box-shadow:0 5px 15px rgba(0,0,0,0.2); z-index:100;">
            <h3 style="color:#f39c12;">💰 客户充值 (资金入账)</h3>
            <p>正在为客户：<b id="tu_customer_name" style="font-size:16px;"></b> 充值</p>
            <input type="hidden" id="tu_customer_id">

            <div style="margin-bottom:15px; background:#f9f9f9; padding:10px; border-radius:4px;">
                <label style="display:block; margin-bottom:5px; color:#666;">1. 关联资金凭证 (必选)：</label>
                <select id="tu_voucher_select" style="width:100%; padding:8px; border:1px solid #ddd;" onchange="autoFillAmount(this)">
                    ${availableVouchers.length > 0 ? voucherOptions : '<option value="">(无可用凭证，请先去审核)</option>'}
                </select>
            </div>

            <div style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; color:#666;">2. 确认入账金额 (必须与凭证一致)：</label>
                <input type="number" id="tu_input_amount" placeholder="请手动输入金额以进行核对" style="width:100%; padding:8px; border:1px solid #ddd;">
            </div>

            <div style="text-align:right; margin-top:20px;">
                <button onclick="document.getElementById('topUpModal').style.display='none'">取消</button>
                <button class="btn-primary" onclick="performTopUp()">校验并充值</button>
            </div>
        </div>
    `;
  }

  // =========================================================================
  // 2. 能源账户管理 (FundEnergyAcct)
  // =========================================================================
  else if (moduleCode === "FundEnergyAcct") {
    contentHTML += `
                    <h2>能源账户管理</h2>
                    <p style="color: #7f8c8d;">管理公司车辆和司机的加油卡、充电桩等能源支出账户。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="账户编号/车牌号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">能源类型</option>
                                <option>加油卡</option>
                                <option>充电桩</option>
                            </select>
                            <button class="btn-primary">查询</button>
                            <button class="btn-primary" style="background-color: #27ae60;">批量充值</button>
                        </div>
                    </div>

                    <h3>能源账户列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>账户ID</th>
                                <th>车牌号/司机</th>
                                <th>能源类型</th>
                                <th>当前余额 (RMB)</th>
                                <th>充值阈值</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>GAS201</td>
                                <td>沪A·T8888</td>
                                <td>加油卡</td>
                                <td><strong style="color: #2980b9;">1,500.00</strong></td>
                                <td>500.00</td>
                                <td>正常</td>
                                <td><a href="#" style="color:#3498db;">充值</a> | <a href="#" style="color:#2980b9;">流水</a></td>
                            </tr>
                            <tr>
                                <td>EV305</td>
                                <td>苏B·E6666</td>
                                <td>充电桩</td>
                                <td><strong style="color: #e74c3c;">200.00</strong></td>
                                <td>500.00</td>
                                <td><span style="color: #e74c3c;">低余额</span></td>
                                <td><a href="#" style="color:#3498db;">充值</a> | <a href="#" style="color:#e74c3c;">预警设置</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 3. 司机/网点钱包 (FundWallet)
  // =========================================================================
  else if (moduleCode === "FundWallet") {
    contentHTML += `
                    <h2>司机/网点钱包管理</h2>
                    <p style="color: #7f8c8d;">管理司机和网点的内部虚拟账户，用于支付酬金、报销或收取代收货款。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="姓名/网点名称/钱包ID" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">用户类型</option>
                                <option>司机</option>
                                <option>网点</option>
                            </select>
                            <button class="btn-primary">查询</button>
                            <button class="btn-primary" style="background-color: #f39c12;">批量提现审批</button>
                        </div>
                    </div>

                    <h3>钱包账户列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>钱包ID</th>
                                <th>用户类型</th>
                                <th>姓名/名称</th>
                                <th>当前余额 (RMB)</th>
                                <th>待提现金额 (RMB)</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>WLT5001</td>
                                <td>司机</td>
                                <td>李师傅</td>
                                <td><strong style="color: #2980b9;">8,500.00</strong></td>
                                <td>1,000.00</td>
                                <td><a href="#" style="color:#f39c12;">提现审批</a> | <a href="#" style="color:#3498db;">流水</a></td>
                            </tr>
                            <tr>
                                <td>WLT5002</td>
                                <td>网点</td>
                                <td>上海分拨中心</td>
                                <td><strong style="color: #2980b9;">12,000.00</strong></td>
                                <td>0.00</td>
                                <td><a href="#" style="color:#3498db;">充值/扣款</a> | <a href="#" style="color:#3498db;">流水</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }



  // =========================================================================
  // 5. 银企直联 (FundBankConnect)
  // =========================================================================
  else if (moduleCode === "FundBankConnect") {
    contentHTML += `
                    <h2>银企直联接口监控</h2>
                    <p style="color: #7f8c8d;">监控与银行系统的接口连接状态、自动对账和支付指令发送情况。</p>
                    
                    <div class="dashboard-grid">
                        <div class="kpi-card" style="padding: 15px;">
                            <div class="kpi-title">当前连接状态</div>
                            <div class="kpi-value" style="font-size: 28px; color: #27ae60;">✅ 运行正常</div>
                        </div>
                         <div class="kpi-card" style="padding: 15px;">
                            <div class="kpi-title">待发送支付指令数</div>
                            <div class="kpi-value" style="font-size: 28px; color: #f39c12;">12 笔</div>
                        </div>
                        <div class="kpi-card" style="padding: 15px;">
                            <div class="kpi-title">今日自动对账成功率</div>
                            <div class="kpi-value" style="font-size: 28px; color: #2980b9;">98.5%</div>
                        </div>
                    </div>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">交易类型</option>
                                <option>余额查询</option>
                                <option>单笔支付</option>
                                <option>批量支付</option>
                                <option>回单查询</option>
                            </select>
                            <input type="date" placeholder="交易日期" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <button class="btn-primary">查询交易日志</button>
                            <button class="btn-primary" style="background-color: #34495e;">查看银行账户配置</button>
                        </div>
                    </div>
                    
                    <h3>银企交易日志</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>交易流水号</th>
                                <th>交易类型</th>
                                <th>金额 (RMB)</th>
                                <th>交易时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>BKTRX251120-101</td>
                                <td>批量支付</td>
                                <td>-15,500.00</td>
                                <td>2025-11-20 10:15</td>
                                <td><span style="color: #27ae60;">成功</span></td>
                                <td><a href="#" style="color:#3498db;">查回单</a></td>
                            </tr>
                            <tr>
                                <td>BKTRX251120-102</td>
                                <td>余额查询</td>
                                <td>-</td>
                                <td>2025-11-20 10:18</td>
                                <td><span style="color: #c0392b;">失败</span></td>
                                <td><a href="#" style="color:#e74c3c;">查看详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 6. 清分与分账规则 (FundClearingRule)
  // =========================================================================
  else if (moduleCode === "FundClearingRule") {
    contentHTML += `
                    <h2>清分与分账规则配置</h2>
                    <p style="color: #7f8c8d;">配置自动将收款资金按预定比例和条件分配给网点、承运商或平台的规则。</p>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增清分规则</button>
                        <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-left: 10px;">
                            <option value="">按业务场景筛选</option>
                            <option>代收货款</option>
                            <option>平台运费</option>
                        </select>
                    </div>

                    <h3>分账规则列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>规则名称</th>
                                <th>业务场景</th>
                                <th>分配目标</th>
                                <th>清分公式</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>代收货款分润规则 V1.0</td>
                                <td>代收货款</td>
                                <td>网点, 平台</td>
                                <td>代收金额*0.5%给网点，剩余归平台</td>
                                <td><span style="color: #27ae60;">生效中</span></td>
                                <td><a href="#" style="color:#3498db;">编辑</a> | <a href="#" style="color:#e74c3c;">停用</a></td>
                            </tr>
                            <tr>
                                <td>平台运费分成 V1.2</td>
                                <td>平台运费</td>
                                <td>承运商, 平台</td>
                                <td>承运商应付金额全额支付，应收余额归平台</td>
                                <td><span style="color: #f39c12;">待审批</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a> | <a href="#" style="color:#27ae60;">审批</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  } else if (moduleCode === "ExpenseLoan") {
    contentHTML += `
                    <h2>借款单</h2>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="借款单号 / 申请人" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">审批状态 (全部)</option>
                                <option>待审批</option>
                                <option>已批准</option>
                                <option>已核销</option>
                            </select>
                            <input type="date" placeholder="借款日期范围" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增借款申请</button>
                        <button class="btn-primary" style="background-color: #f39c12;">待审批 (3)</button>
                    </div>

                    <h3>借款单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>借款单号</th>
                                <th>申请人/部门</th>
                                <th>借款金额 (RMB)</th>
                                <th>预计还款日</th>
                                <th>状态</th>
                                <th>已核销金额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>JQ202511001</td>
                                <td>李四 / 销售部</td>
                                <td>5,000.00</td>
                                <td>2025-12-30</td>
                                <td><span style="color: #f39c12;">待审批</span></td>
                                <td>0.00</td>
                                <td><a href="#" style="color:#3498db;">查看/审批</a></td>
                            </tr>
                            <tr>
                                <td>JQ202510002</td>
                                <td>王五 / 运营部</td>
                                <td>2,000.00</td>
                                <td>2025-11-25</td>
                                <td><span style="color: #27ae60;">已批准</span></td>
                                <td>1,500.00</td>
                                <td><a href="#" style="color:#3498db;">查看/核销</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 13. 还款单 (Expense Repay)
  // =========================================================================
  else if (moduleCode === "ExpenseRepay") {
    contentHTML += `
                    <h2>还款单</h2>
                    <p style="color: #7f8c8d;">记录员工对已批准的借款进行归还的单据，用于结清借款余额。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="还款单号 / 还款人" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">状态 (全部)</option>
                                <option>待入账</option>
                                <option>已入账</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 登记还款</button>
                    </div>

                    <h3>还款单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>还款单号</th>
                                <th>还款人</th>
                                <th>还款金额 (RMB)</th>
                                <th>关联借款单号</th>
                                <th>还款方式</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>HK202511005</td>
                                <td>王五</td>
                                <td>500.00</td>
                                <td>JQ202510002</td>
                                <td>银行转账</td>
                                <td><span style="color: #f39c12;">待入账</span></td>
                                <td><a href="#" style="color:#3498db;">确认入账</a></td>
                            </tr>
                            <tr>
                                <td>HK202511006</td>
                                <td>张三</td>
                                <td>1,000.00</td>
                                <td>JQ202510001</td>
                                <td>现金</td>
                                <td><span style="color: #27ae60;">已入账</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 14. 日常费用报销 (Expense Daily)
  // =========================================================================
  else if (moduleCode === "ExpenseDaily") {
    contentHTML += `
                    <h2>日常费用报销</h2>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="报销单号 / 申请人" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">报销类型 (全部)</option>
                                <option>办公费</option>
                                <option>业务招待费</option>
                                <option>通讯费</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">状态 (全部)</option>
                                <option>待付款</option>
                                <option>已付款</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增报销单</button>
                        <button class="btn-primary" style="background-color: #3498db;">待付款处理 (12)</button>
                    </div>

                    <h3>日常报销单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>报销单号</th>
                                <th>报销人</th>
                                <th>总金额 (RMB)</th>
                                <th>冲销借款</th>
                                <th>应付金额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>BX202511010</td>
                                <td>赵六</td>
                                <td>850.00</td>
                                <td>否</td>
                                <td>850.00</td>
                                <td><span style="color: #f39c12;">待付款</span></td>
                                <td><a href="#" style="color:#3498db;">查看/审核</a></td>
                            </tr>
                            <tr>
                                <td>BX202511011</td>
                                <td>钱七</td>
                                <td>3,200.00</td>
                                <td>是 (2000)</td>
                                <td>1,200.00</td>
                                <td><span style="color: #27ae60;">已付款</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 15. 差旅报销 (Expense Travel)
  // =========================================================================
  else if (moduleCode === "ExpenseTravel") {
    contentHTML += `
                    <h2>差旅报销</h2>
                    <p style="color: #7f8c8d;">管理出差申请关联的交通、住宿、补贴等报销，通常与差旅申请单关联。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="报销单号 / 目的地" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">状态 (全部)</option>
                                <option>待审批</option>
                                <option>已批准</option>
                            </select>
                            <input type="text" placeholder="关联差旅申请号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增差旅报销</button>
                    </div>

                    <h3>差旅报销单列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>报销单号</th>
                                <th>报销人</th>
                                <th>出差事由</th>
                                <th>报销总额 (RMB)</th>
                                <th>冲借款金额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CL202511003</td>
                                <td>李四</td>
                                <td>拜访深圳客户</td>
                                <td>4,500.00</td>
                                <td>3,000.00</td>
                                <td><span style="color: #f39c12;">待审批</span></td>
                                <td><a href="#" style="color:#3498db;">查看/审批</a></td>
                            </tr>
                            <tr>
                                <td>CL202510001</td>
                                <td>张三</td>
                                <td>参加行业会议</td>
                                <td>2,100.00</td>
                                <td>0.00</td>
                                <td><span style="color: #27ae60;">已批准</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }


  
  // =========================================================================
  // 16. 酬金结算 (Expense Compensation)
  // =========================================================================
  else if (moduleCode === "ExpenseCompensation") {
    contentHTML += `
                    <h2>酬金结算</h2>
                    <p style="color: #7f8c8d;">处理与运单或批次关联的司机、网点的服务费、提成或奖励等结算。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="结算批次号 / 对象名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">结算对象</option>
                                <option>司机</option>
                                <option>网点</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">状态 (全部)</option>
                                <option>待发放</option>
                                <option>已发放</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">批量生成付款单</button>
                    </div>

                    <h3>酬金结算列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>结算单号</th>
                                <th>结算对象</th>
                                <th>对象名称</th>
                                <th>酬金总额 (RMB)</th>
                                <th>结算周期</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CJ202511001</td>
                                <td>司机</td>
                                <td>王师傅</td>
                                <td>3,800.00</td>
                                <td>2025-11</td>
                                <td><span style="color: #f39c12;">待发放</span></td>
                                <td><a href="#" style="color:#3498db;">查看/支付</a></td>
                            </tr>
                            <tr>
                                <td>CJ202511002</td>
                                <td>网点</td>
                                <td>西区网点</td>
                                <td>15,000.00</td>
                                <td>2025-10</td>
                                <td><span style="color: #27ae60;">已发放</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  } // =========================================================================
  // 17. 运单挂账 (Pending Waybill)
  // =========================================================================
  else if (moduleCode === "PendingWaybill") {
    contentHTML += `
                    <h2>运单挂账</h2>
                    <p style="color: #7f8c8d;">记录因特殊原因（如客户信用额度不足、数据异常等）无法正常结算的运单，等待后续处理。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="运单号 / 客户名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">挂账原因 (全部)</option>
                                <option>信用额度超限</option>
                                <option>结算数据待确认</option>
                                <option>客户争议</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">处理状态 (全部)</option>
                                <option>待处理</option>
                                <option>已解除</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #f39c12;">批量解除挂账</button>
                    </div>

                    <h3>运单挂账列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>运单号</th>
                                <th>客户名称</th>
                                <th>应收金额 (RMB)</th>
                                <th>挂账日期</th>
                                <th>挂账原因</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>YD202511015</td>
                                <td>Epsilon科技</td>
                                <td>8,000.00</td>
                                <td>2025-11-20</td>
                                <td>信用额度超限</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">待处理</span></td>
                                <td><a href="#" style="color:#3498db;">查看详情</a> | <a href="#" style="color:#27ae60;">解除挂账</a></td>
                            </tr>
                            <tr>
                                <td>YD202511016</td>
                                <td>Delta制造</td>
                                <td>1,500.00</td>
                                <td>2025-11-19</td>
                                <td>结算数据待确认</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">待处理</span></td>
                                <td><a href="#" style="color:#3498db;">查看详情</a> | <a href="#" style="color:#27ae60;">解除挂账</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 18. 异动挂账 (Pending Abnormal)
  // =========================================================================
  else if (moduleCode === "PendingAbnormal") {
    contentHTML += `
                    <h2>异动挂账</h2>
                    <p style="color: #7f8c8d;">记录因运输过程中的异常或赔付产生的费用调整（如超期罚款、理赔费用），等待最终定损核算。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="异动单号 / 关联运单号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">异动类型 (全部)</option>
                                <option>破损赔付</option>
                                <option>超期罚款</option>
                                <option>异常处理费</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增异动挂账</button>
                    </div>

                    <h3>异动挂账列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>异动单号</th>
                                <th>关联运单号</th>
                                <th>异动类型</th>
                                <th>挂账金额 (RMB)</th>
                                <th>挂账对象</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>YDZ202511003</td>
                                <td>YD202511010</td>
                                <td>破损赔付</td>
                                <td>-2,500.00 (应收减少)</td>
                                <td>客户A</td>
                                <td><span style="color: #f39c12;">待定损</span></td>
                                <td><a href="#" style="color:#3498db;">定损/处理</a></td>
                            </tr>
                            <tr>
                                <td>YDZ202511004</td>
                                <td>YD202511011</td>
                                <td>超期罚款</td>
                                <td>1,000.00 (应付增加)</td>
                                <td>承运商B</td>
                                <td><span style="color: #27ae60;">已核算</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 19. 其他挂账 (Pending Other)
  // =========================================================================
  else if (moduleCode === "PendingOther") {
    contentHTML += `
                    <h2>其他挂账</h2>
                    <p style="color: #7f8c8d;">记录非运单和异动产生的、需财务部门单独跟进和解除的临时性或特殊性挂账。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="挂账单号 / 摘要" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">挂账类型 (全部)</option>
                                <option>系统接口差异</option>
                                <option>临时借支</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增其他挂账</button>
                        <button class="btn-primary" style="background-color: #f39c12;">批量标记已处理</button>
                    </div>

                    <h3>其他挂账列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>挂账单号</th>
                                <th>金额 (RMB)</th>
                                <th>方向</th>
                                <th>挂账日期</th>
                                <th>摘要/说明</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>QT202511001</td>
                                <td>500.00</td>
                                <td>应付</td>
                                <td>2025-11-18</td>
                                <td>系统运费计算接口差异</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">待处理</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a> | <a href="#" style="color:#27ae60;">标记解除</a></td>
                            </tr>
                            <tr>
                                <td>QT202511002</td>
                                <td>1,200.00</td>
                                <td>应收</td>
                                <td>2025-11-17</td>
                                <td>临时客户借款</td>
                                <td><span style="color: #27ae60;">已处理</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  } // =========================================================================
  // 20. 进项发票台账 (Tax Input Invoice)
  // =========================================================================
  else if (moduleCode === "TaxInputInvoice") {
    contentHTML += `
                    <h2>进项发票台账 (收到的发票)</h2>
                    <p style="color: #7f8c8d;">记录和管理从供应商收到的进项发票，作为抵扣税款和成本核算的依据。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="发票号码 / 供应商名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">认证状态 (全部)</option>
                                <option>待认证</option>
                                <option>已认证</option>
                                <option>作废</option>
                            </select>
                            <input type="date" placeholder="开票日期范围" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 手动录入发票</button>
                        <button class="btn-primary" style="background-color: #3498db;">批量导入/OCR</button>
                        <button class="btn-primary" style="background-color: #f39c12;">批量勾选认证</button>
                    </div>

                    <h3>进项发票列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>发票号码</th>
                                <th>供应商名称</th>
                                <th>金额 (RMB)</th>
                                <th>税额 (RMB)</th>
                                <th>价税合计 (RMB)</th>
                                <th>开票日期</th>
                                <th>认证状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1300055215</td>
                                <td>A设备供应</td>
                                <td>9,090.91</td>
                                <td>909.09</td>
                                <td>10,000.00</td>
                                <td>2025-11-15</td>
                                <td><span style="color: #f39c12;">待认证</span></td>
                                <td><a href="#" style="color:#3498db;">详情/操作</a></td>
                            </tr>
                            <tr>
                                <td>1300055216</td>
                                <td>B运输服务</td>
                                <td>4,716.98</td>
                                <td>283.02</td>
                                <td>5,000.00</td>
                                <td>2025-11-10</td>
                                <td><span style="color: #27ae60;">已认证</span></td>
                                <td><a href="#" style="color:#3498db;">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 21. 销项发票台账 (TaxOutputInvoice) - [最终联动版]
  // =========================================================================
  else if (moduleCode === "TaxOutputInvoice") {
    // 1. 读取【待开票队列】(来自运单和对账单的推送)
    const pendingQueue = JSON.parse(
      sessionStorage.getItem("PendingInvoiceQueue") || "[]"
    );

    // 生成待开票行 (黄色背景)
    const pendingRows = pendingQueue
      .map(
        (item, index) => `
                    <tr style="background-color: #fffbe6; border-left: 3px solid #f1c40f;">
                        <td style="color:#999;">(自动生成)</td>
                        <td>${item.client} <span style="font-size:12px;color:#666;">[来源:${item.sourceId}]</span></td>
                        <td style="font-weight:bold;">${item.amount}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td><span style="color: #f39c12; font-weight:bold;">待开票</span></td>
                        <td>
                            <button class="btn-primary" style="padding:4px 8px; font-size:12px;" onclick="generateInvoiceFromQueue('${item.sourceId}', '${item.client}', '${item.amount}', ${index})">立即开票</button>
                        </td>
                    </tr>
                `
      )
      .join("");

    // 2. 读取【已开票记录】
    const invoices = JSON.parse(
      sessionStorage.getItem("OutputInvoices") || "[]"
    );
    const invoiceRows = invoices
      .map(
        (inv) => `
                    <tr>
                        <td>${inv.no}</td>
                        <td>${inv.client}</td>
                        <td>${inv.amount}</td>
                        <td>${inv.tax}</td>
                        <td>${inv.total}</td>
                        <td>${inv.date}</td>
                        <td><span style="color:#27ae60;font-weight:bold;">已开票</span></td>

                        <td><a href="javascript:void(0)" onclick="viewInvoiceDetail('${inv.no}')" style="color:#3498db;">查看</a></td>
                    </tr>
                `
      )
      .join("");

    contentHTML += `
                    <h2>销项发票台账</h2>
                    <p style="color:#7f8c8d;">此处集中处理来自各业务模块的开票申请。</p>
                    
                    <div class="action-bar" style="margin-bottom:15px;">
                        <button class="btn-primary" onclick="loadContent('TaxOutputInvoice')">刷新待办任务</button>
                    </div>

                    <table class="data-table">
                        <thead><tr><th>发票号</th><th>客户/对象</th><th>金额</th><th>税额</th><th>价税合计</th><th>开票日期</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${pendingRows} ${invoiceRows} ${
      pendingRows.length === 0 && invoiceRows.length === 0
        ? '<tr><td colspan="8" style="text-align:center;color:#ccc;">暂无开票任务，请去结算/对账模块发起。</td></tr>'
        : ""
    }
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 22. 发票详情页 (InvoiceDetail) - [终极修正版：自动算税 + 完美UI]
  // =========================================================================
  else if (moduleCode === "InvoiceDetail") {
    // 1. 获取基础数据
    let inv = window.g_currentInvoice || {
      no: "253420000002",
      date: "2025年11月24日",
      clientName: "演示客户公司",
      clientTaxId: "9132xxxxxxxx",
      sellerName: "乐享物流有限公司",
      sellerTaxId: "9131xxxxxxxx",
      amount: "1,000.00", // 基础金额
    };

    // 2. ★★★ 核心修复：强制重新计算税额和总价 ★★★
    // 去掉逗号转数字
    const rawAmount = parseFloat(inv.amount.toString().replace(/,/g, "")) || 0;
    const taxRateVal = 0.09; // 9% 税率
    const rawTax = rawAmount * taxRateVal;
    const rawTotal = rawAmount + rawTax;

    // 格式化回字符串 (保留2位小数)
    inv.amount = rawAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    inv.taxRate = "9%";
    inv.tax = rawTax.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    inv.total = rawTotal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // 生成大写金额
    inv.totalCn =
      typeof convertCurrency === "function"
        ? convertCurrency(rawTotal)
        : "（金额计算中...）";

    // 发票专用色 (深红褐色)
    const inkColor = "#b15b36";
    const borderStyle = `1px solid ${inkColor}`;

    contentHTML += `
                    <div style="margin-bottom:20px; display:flex; justify-content:space-between;">
                        <button class="btn-primary" style="background-color: #95a5a6;" onclick="loadContent('TaxOutputInvoice')"> < 返回列表</button>
                        <div>
                            <button class="btn-primary" style="background-color: #3498db;">🖨 打印发票</button>
                            <button class="btn-primary" style="background-color: #27ae60;">下载 PDF</button>
                        </div>
                    </div>

                    <div style="background: #fff; padding: 30px; border: 1px solid #ccc; width: 950px; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1); font-family: 'SimSun', 'Songti SC', serif; color: ${inkColor}; box-sizing: border-box;">
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; padding: 0 10px;">
                            <div style="width: 20%;">
                                <div style="width: 80px; height: 80px; border: 1px solid #ddd; padding: 2px; background:#fff; display:flex; align-items:center; justify-content:center; color:#000; font-size:10px;">
                                    (二维码)
                                </div>
                            </div>
                            <div style="text-align: center; flex: 1; padding-top: 10px;">
                                <h4 style="font-size: 32px; font-family: 'KaiTi', 'STKaiti', serif; font-weight: bold; margin: 0; letter-spacing: 3px; color: ${inkColor}; border-bottom: 2px double ${inkColor}; display: inline-block; padding-bottom: 5px;">电子发票（增值税专用发票）</h2>
                            </div>
                            <div style="width: 25%; text-align: right; line-height: 1.6; font-size: 14px; font-weight: bold; color: ${inkColor};">
                                <div>发票代码：<span style="color:#000;">031001900111</span></div>
                                <div>发票号码：<span style="color:#000;">${inv.no}</span></div>
                                <div>开票日期：<span style="color:#000;">${inv.date}</span></div>
                                <div>校&nbsp;验&nbsp;码：<span style="color:#000;">1234 5678 9012 3456 7890</span></div>
                            </div>
                        </div>

                        <table style="width: 100%; border-collapse: collapse; border: 2px solid ${inkColor}; font-size: 13px;">
                            
                            <tr>
                                <td style="width: 25px; padding: 15px 5px; text-align: center; border-right: ${borderStyle}; border-bottom: ${borderStyle}; line-height: 1.4;">
                                    购<br>买<br>方
                                </td>
                                <td style="width: 55%; padding: 6px 10px; border-right: ${borderStyle}; border-bottom: ${borderStyle}; line-height: 1.8; color: #333;">
                                    <div><span style="color:${inkColor}">名　　　　称：</span>${inv.clientName}</div>
                                    <div><span style="color:${inkColor}">纳税人识别号：</span><span style="font-family:Arial;">${inv.clientTaxId}</span></div>
                                    <div><span style="color:${inkColor}">地 址、电 话：</span>上海市浦东新区... 021-88888888</div>
                                    <div><span style="color:${inkColor}">开户行及账号：</span>招商银行... 6225xxxxxxxx</div>
                                </td>
                                <td style="width: 25px; padding: 15px 5px; text-align: center; border-right: ${borderStyle}; border-bottom: ${borderStyle}; line-height: 1.4;">
                                    密<br>码<br>区
                                </td>
                                <td style="padding: 6px; border-bottom: ${borderStyle}; font-family: 'Courier New', monospace; font-size: 12px; color: #333; word-break: break-all;">
                                    &lt;01*&gt;56*9&gt;81/02-8&lt;3*&lt;-31&lt;/02&lt;&lt;53+
                                    <br>*&gt;-6+77/&gt;+&lt;51*&lt;-/5+56*9&gt;81/02-8
                                    <br>&lt;3*&lt;-31&lt;4&gt;2*9&lt;&lt;01+/8&lt;7+&gt;-2*5&lt;1
                                </td>
                            </tr>

                            <tr style="text-align: center; color: ${inkColor}; background-color: transparent;">
                                <td colspan="4" style="padding: 0; border-bottom: ${borderStyle};">
                                    <table style="width: 100%; border-collapse: collapse; text-align: center;">
                                        <tr>
                                            <td style="width: 30%; padding: 5px; border-right: ${borderStyle};">货物或应税劳务、服务名称</td>
                                            <td style="width: 10%; padding: 5px; border-right: ${borderStyle};">规格型号</td>
                                            <td style="width: 5%;  padding: 5px; border-right: ${borderStyle};">单位</td>
                                            <td style="width: 10%; padding: 5px; border-right: ${borderStyle};">数量</td>
                                            <td style="width: 15%; padding: 5px; border-right: ${borderStyle};">单价</td>
                                            <td style="width: 15%; padding: 5px; border-right: ${borderStyle};">金额</td>
                                            <td style="width: 5%;  padding: 5px; border-right: ${borderStyle};">税率</td>
                                            <td style="width: 10%; padding: 5px;">税额</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr style="height: 150px; vertical-align: top; color: #000;">
                                <td colspan="4" style="padding: 0; border-bottom: ${borderStyle};">
                                    <table style="width: 100%; border-collapse: collapse; text-align: center; font-family: Arial;">
                                        <tr>
                                            <td style="width: 30%; padding: 8px; text-align: left; border-right: ${borderStyle};">*物流辅助服务*运输服务费</td>
                                            <td style="width: 10%; border-right: ${borderStyle};"></td>
                                            <td style="width: 5%;  border-right: ${borderStyle};">项</td>
                                            <td style="width: 10%; text-align: right; padding-right: 5px; border-right: ${borderStyle};">1</td>
                                            <td style="width: 15%; text-align: right; padding-right: 5px; border-right: ${borderStyle};">${inv.amount}</td>
                                            <td style="width: 15%; text-align: right; padding-right: 5px; border-right: ${borderStyle};">${inv.amount}</td>
                                            <td style="width: 5%;  text-align: right; padding-right: 5px; border-right: ${borderStyle};">${inv.taxRate}</td>
                                            <td style="width: 10%; text-align: right; padding-right: 5px;">${inv.tax}</td>
                                        </tr>
                                        <tr><td style="border-right: ${borderStyle}; height: 100px;"></td><td style="border-right: ${borderStyle};"></td><td style="border-right: ${borderStyle};"></td><td style="border-right: ${borderStyle};"></td><td style="border-right: ${borderStyle};"></td><td style="border-right: ${borderStyle};"></td><td style="border-right: ${borderStyle};"></td><td></td></tr>
                                    </table>
                                </td>
                            </tr>

                            <tr style="height: 30px; color: ${inkColor}; border-bottom: ${borderStyle};">
                                <td colspan="4" style="padding: 0;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="width: 30%; text-align: center; border-right: ${borderStyle}; padding: 5px;">合　　　　计</td>
                                            <td style="width: 40%; border-right: ${borderStyle};"></td>
                                            <td style="width: 15%; border-right: ${borderStyle}; text-align: right; padding-right: 5px; color: #000; font-family: Arial;">¥${inv.amount}</td>
                                            <td style="width: 15%; text-align: right; padding-right: 5px; color: #000; font-family: Arial;">¥${inv.tax}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr style="height: 35px; border-bottom: ${borderStyle};">
                                <td colspan="4" style="padding: 0;">
                                    <div style="display:flex; align-items:center; height: 100%;">
                                        <div style="width: 23%; text-align: center; border-right: ${borderStyle}; height: 100%; padding-top: 8px; box-sizing:border-box;">价税合计 (大写)</div>
                                        <div style="flex: 1; padding-left: 15px; display:flex; align-items:center; height: 100%;">
                                            <span style="border: 1px solid ${inkColor}; border-radius: 50%; padding: 0 3px; font-size: 10px; margin-right: 8px; color:${inkColor};">ⓧ</span>
                                            <span style="font-family: 'KaiTi'; font-size: 16px; color: #000;">${inv.totalCn}</span>
                                        </div>
                                        <div style="width: 30%; text-align: right; padding-right: 10px; color: ${inkColor};">
                                            (小写) <span style="color: #000; font-family: Arial;">¥${inv.total}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td style="width: 25px; padding: 15px 5px; text-align: center; border-right: ${borderStyle}; line-height: 1.4;">
                                    销<br>售<br>方
                                </td>
                                <td colspan="3" style="padding: 6px 10px; line-height: 1.8; color: #333;">
                                    <div><span style="color:${inkColor}">名　　　　称：</span>${inv.sellerName}</div>
                                    <div><span style="color:${inkColor}">纳税人识别号：</span><span style="font-family:Arial;">${inv.sellerTaxId}</span></div>
                                    <div><span style="color:${inkColor}">地 址、电 话：</span>滁州市... 0550-8888888</div>
                                    <div><span style="color:${inkColor}">开户行及账号：</span>工行... 1234567890</div>
                                </td>
                            </tr>
                        </table>

                        <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 14px; padding: 0 10px;">
                            <div style="width: 25%;">收款人：李财务</div>
                            <div style="width: 25%;">复核：张主管</div>
                            <div style="width: 25%;">开票人：管理员</div>
                            <div style="width: 25%;">销售方：(章)</div>
                        </div>

                    </div>
                `;
  }

  // =========================================================================
  // 22. 税率配置 (Tax Rate Config)
  // =========================================================================
  else if (moduleCode === "TaxRateConfig") {
    contentHTML += `
                    <h2>税率配置</h2>
                    <p style="color: #7f8c8d;">管理系统中使用的所有税率和税种配置，包括增值税、附加税等，确保计费和开票准确。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="税种名称 / 编码" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">状态 (全部)</option>
                                <option>启用</option>
                                <option>停用</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增税率配置</button>
                    </div>

                    <h3>税率配置列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>税种名称</th>
                                <th>税率 (%)</th>
                                <th>税收编码</th>
                                <th>生效日期</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>增值税 - 一般计税</td>
                                <td>9%</td>
                                <td>304020101</td>
                                <td>2019-04-01</td>
                                <td><span style="color: #27ae60;">启用</span></td>
                                <td><a href="#" style="color:#3498db;">编辑</a> | <a href="#" style="color:#e74c3c;">停用</a></td>
                            </tr>
                            <tr>
                                <td>增值税 - 小规模</td>
                                <td>3%</td>
                                <td>304020102</td>
                                <td>2019-01-01</td>
                                <td><span style="color: #27ae60;">启用</span></td>
                                <td><a href="#" style="color:#3498db;">编辑</a> | <a href="#" style="color:#e74c3c;">停用</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  } // =========================================================================
  // 23. 预算编制 (Budget Planning)
  // =========================================================================
  else if (moduleCode === "BudgetPlanning") {
    contentHTML += `
                    <h2>预算编制</h2>
                    <p style="color: #7f8c8d;">按年度/季度/部门/科目编制和管理公司的运营预算。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">预算年度</option>
                                <option>2026</option>
                                <option>2025</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">预算版本</option>
                                <option>初稿</option>
                                <option>终版</option>
                                <option>调整版A</option>
                            </select>
                            <input type="text" placeholder="部门名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增预算版本</button>
                        <button class="btn-primary" style="background-color: #3498db;">下载预算模板</button>
                        <button class="btn-primary" style="background-color: #f39c12;">导入预算数据</button>
                    </div>

                    <h3>2025年度预算概览 (终版)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>部门/科目</th>
                                <th>年度预算总额 (RMB)</th>
                                <th>一季度</th>
                                <th>二季度</th>
                                <th>三季度</th>
                                <th>四季度</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>销售部 - 差旅费</td>
                                <td>500,000.00</td>
                                <td>150,000.00</td>
                                <td>150,000.00</td>
                                <td>100,000.00</td>
                                <td>100,000.00</td>
                                <td><a href="#" style="color:#3498db;">编辑详情</a></td>
                            </tr>
                            <tr>
                                <td>运营部 - 车辆维护费</td>
                                <td>800,000.00</td>
                                <td>200,000.00</td>
                                <td>200,000.00</td>
                                <td>200,000.00</td>
                                <td>200,000.00</td>
                                <td><a href="#" style="color:#3498db;">编辑详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 24. 预算执行分析 (Budget Analysis)
  // =========================================================================
  else if (moduleCode === "BudgetAnalysis") {
    contentHTML += `
                    <h2>预算执行分析</h2>
                    <p style="color: #7f8c8d;">实时跟踪和比较实际发生费用与预算金额，监控预算使用情况，并预警超支风险。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">预算周期</option>
                                <option>本年度</option>
                                <option>本季度</option>
                                <option>本月</option>
                            </select>
                            <input type="text" placeholder="部门/科目筛选" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="summary-cards" style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <div class="card" style="flex: 1; padding: 15px; border-radius: 6px; background-color: #e8f5e9; border-left: 5px solid #27ae60;">
                            <h4>预算总额 (本年)</h4>
                            <p style="font-size: 24px; color: #27ae60;">12,000,000.00</p>
                        </div>
                        <div class="card" style="flex: 1; padding: 15px; border-radius: 6px; background-color: #fff3e0; border-left: 5px solid #f39c12;">
                            <h4>实际发生 (本年)</h4>
                            <p style="font-size: 24px; color: #f39c12;">8,500,000.00</p>
                        </div>
                        <div class="card" style="flex: 1; padding: 15px; border-radius: 6px; background-color: #fbecec; border-left: 5px solid #e74c3c;">
                            <h4>超支风险预警</h4>
                            <p style="font-size: 24px; color: #e74c3c;">2个科目</p>
                        </div>
                    </div>

                    <h3>预算执行明细</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>部门</th>
                                <th>费用科目</th>
                                <th>预算金额 (RMB)</th>
                                <th>实际发生 (RMB)</th>
                                <th>预算差异 (RMB)</th>
                                <th>执行率 (%)</th>
                                <th>趋势</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>销售部</td>
                                <td>差旅费</td>
                                <td>500,000.00</td>
                                <td>450,000.00</td>
                                <td>+50,000.00</td>
                                <td>90.0%</td>
                                <td><span style="color: #27ae60;">达标</span></td>
                            </tr>
                            <tr>
                                <td>运营部</td>
                                <td>车辆维护费</td>
                                <td>800,000.00</td>
                                <td>850,000.00</td>
                                <td>-50,000.00</td>
                                <td>106.3%</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">超支</span></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 25. 绩效考核 (Performance Assessment)
  // =========================================================================
  else if (moduleCode === "PerformanceAssessment") {
    contentHTML += `
                    <h2>绩效考核</h2>
                    <p style="color: #7f8c8d;">基于财务数据（如成本控制、利润率、回款率）对部门或个人进行绩效评估。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">考核周期</option>
                                <option>2025 Q4</option>
                                <option>2025 Q3</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">考核对象类型</option>
                                <option>部门</option>
                                <option>员工</option>
                            </select>
                            <input type="text" placeholder="考核对象名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #3498db;">发起绩效计算</button>
                        <button class="btn-primary" style="background-color: #f39c12;">导出考核结果</button>
                    </div>

                    <h3>2025 Q4 部门绩效结果</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>考核对象 (部门)</th>
                                <th>回款率目标</th>
                                <th>实际回款率 (%)</th>
                                <th>成本控制目标</th>
                                <th>实际成本偏差 (%)</th>
                                <th>综合得分</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>销售部</td>
                                <td>98.0%</td>
                                <td>99.5%</td>
                                <td>±3%</td>
                                <td>+1.2%</td>
                                <td>95.0</td>
                                <td><a href="#" style="color:#3498db;">查看明细</a></td>
                            </tr>
                            <tr>
                                <td>运营部</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>±5%</td>
                                <td>-6.5%</td>
                                <td>80.5</td>
                                <td><a href="#" style="color:#3498db;">查看明细</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  } // =========================================================================
  // 23. 预算编制 (Budget Planning)
  // =========================================================================
  else if (moduleCode === "BudgetPlanning") {
    contentHTML += `
                    <h2>预算编制</h2>
                    <p style="color: #7f8c8d;">按年度/季度/部门/科目编制和管理公司的运营预算。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">预算年度</option>
                                <option>2026</option>
                                <option>2025</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">预算版本</option>
                                <option>初稿</option>
                                <option>终版</option>
                                <option>调整版A</option>
                            </select>
                            <input type="text" placeholder="部门名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增预算版本</button>
                        <button class="btn-primary" style="background-color: #3498db;">下载预算模板</button>
                        <button class="btn-primary" style="background-color: #f39c12;">导入预算数据</button>
                    </div>

                    <h3>2025年度预算概览 (终版)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>部门/科目</th>
                                <th>年度预算总额 (RMB)</th>
                                <th>一季度</th>
                                <th>二季度</th>
                                <th>三季度</th>
                                <th>四季度</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>销售部 - 差旅费</td>
                                <td>500,000.00</td>
                                <td>150,000.00</td>
                                <td>150,000.00</td>
                                <td>100,000.00</td>
                                <td>100,000.00</td>
                                <td><a href="#" style="color:#3498db;">编辑详情</a></td>
                            </tr>
                            <tr>
                                <td>运营部 - 车辆维护费</td>
                                <td>800,000.00</td>
                                <td>200,000.00</td>
                                <td>200,000.00</td>
                                <td>200,000.00</td>
                                <td>200,000.00</td>
                                <td><a href="#" style="color:#3498db;">编辑详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 24. 预算执行分析 (Budget Execution Analysis) - 修正代码名称
  // =========================================================================
  else if (moduleCode === "BudgetExecutionAnalysis") {
    contentHTML += `
                    <h2>预算执行分析</h2>
                    <p style="color: #7f8c8d;">实时跟踪和比较实际发生费用与预算金额，监控预算使用情况，并预警超支风险。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">预算周期</option>
                                <option>本年度</option>
                                <option>本季度</option>
                                <option>本月</option>
                            </select>
                            <input type="text" placeholder="部门/科目筛选" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="summary-cards" style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <div class="card" style="flex: 1; padding: 15px; border-radius: 6px; background-color: #e8f5e9; border-left: 5px solid #27ae60;">
                            <h4>预算总额 (本年)</h4>
                            <p style="font-size: 24px; color: #27ae60;">12,000,000.00</p>
                        </div>
                        <div class="card" style="flex: 1; padding: 15px; border-radius: 6px; background-color: #fff3e0; border-left: 5px solid #f39c12;">
                            <h4>实际发生 (本年)</h4>
                            <p style="font-size: 24px; color: #f39c12;">8,500,000.00</p>
                        </div>
                        <div class="card" style="flex: 1; padding: 15px; border-radius: 6px; background-color: #fbecec; border-left: 5px solid #e74c3c;">
                            <h4>超支风险预警</h4>
                            <p style="font-size: 24px; color: #e74c3c;">2个科目</p>
                        </div>
                    </div>

                    <h3>预算执行明细</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>部门</th>
                                <th>费用科目</th>
                                <th>预算金额 (RMB)</th>
                                <th>实际发生 (RMB)</th>
                                <th>预算差异 (RMB)</th>
                                <th>执行率 (%)</th>
                                <th>趋势</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>销售部</td>
                                <td>差旅费</td>
                                <td>500,000.00</td>
                                <td>450,000.00</td>
                                <td>+50,000.00</td>
                                <td>90.0%</td>
                                <td><span style="color: #27ae60;">达标</span></td>
                            </tr>
                            <tr>
                                <td>运营部</td>
                                <td>车辆维护费</td>
                                <td>800,000.00</td>
                                <td>850,000.00</td>
                                <td>-50,000.00</td>
                                <td>106.3%</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">超支</span></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 25. 绩效考核 (Budget Performance) - 修正代码名称
  // =========================================================================
  else if (moduleCode === "BudgetPerformance") {
    contentHTML += `
                    <h2>绩效考核</h2>
                    <p style="color: #7f8c8d;">基于财务数据（如成本控制、利润率、回款率）对部门或个人进行绩效评估。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">考核周期</option>
                                <option>2025 Q4</option>
                                <option>2025 Q3</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">考核对象类型</option>
                                <option>部门</option>
                                <option>员工</option>
                            </select>
                            <input type="text" placeholder="考核对象名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #3498db;">发起绩效计算</button>
                        <button class="btn-primary" style="background-color: #f39c12;">导出考核结果</button>
                    </div>

                    <h3>2025 Q4 部门绩效结果</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>考核对象 (部门)</th>
                                <th>回款率目标</th>
                                <th>实际回款率 (%)</th>
                                <th>成本控制目标</th>
                                <th>实际成本偏差 (%)</th>
                                <th>综合得分</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>销售部</td>
                                <td>98.0%</td>
                                <td>99.5%</td>
                                <td>±3%</td>
                                <td>+1.2%</td>
                                <td>95.0</td>
                                <td><a href="#" style="color:#3498db;">查看明细</a></td>
                            </tr>
                            <tr>
                                <td>运营部</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>±5%</td>
                                <td>-6.5%</td>
                                <td>80.5</td>
                                <td><a href="#" style="color:#3498db;">查看明细</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 26. 敏感操作日志 (RiskSensitiveLog) - [最终版：支持多条记录共存]
  // =========================================================================
  else if (moduleCode === "RiskSensitiveLog") {
    // 1. 读取所有动态日志 (数组)
    const logsStr = sessionStorage.getItem("GlobalAuditLogs");
    let dynamicRowsHTML = "";

    if (logsStr) {
      const logs = JSON.parse(logsStr);
      // 2. 循环生成每一行 HTML
      dynamicRowsHTML = logs
        .map((log) => {
          // 根据风险等级决定颜色
          const badgeColor =
            log.level === "高危"
              ? "#e74c3c"
              : log.level === "中风险"
              ? "#f39c12"
              : "#3498db";
          const actionColor = log.level === "高危" ? "#c0392b" : "#333";

          return `
                            <tr style="background-color: #fff0f0; animation: highlight 2s;">
                                <td><span style="background:${badgeColor}; color:white; padding:2px 6px; border-radius:4px; font-size:12px;">● ${
            log.level
          }</span></td>
                                <td>${log.time}</td>
                                <td><strong>${log.user}</strong></td>
                                <td>${log.ip}</td>
                                <td>${log.module}</td>
                                <td style="color: ${actionColor}; font-weight:bold;">${
            log.action
          }</td>
                                <td>${log.detail}</td>
                                <td>
                                    <a href="javascript:void(0)" onclick="alert('【系统快照】\\n----------------\\n数据指纹：Hash-${Math.floor(
                                      Math.random() * 10000000
                                    )}')" style="color:#3498db;">查看快照</a>
                                </td>
                            </tr>
                        `;
        })
        .join(""); // 将数组拼接成字符串
    }

    contentHTML += `
                    <h2>敏感操作日志 🛡️</h2>
                    <p style="color: #7f8c8d;">系统的“黑匣子”，记录所有涉及资金安全、内控合规的高风险操作行为。审计数据不可删除。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items:center;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">风险等级 (全部)</option>
                                <option value="high">🔴 高危</option>
                                <option value="medium">🟠 中风险</option>
                            </select>
                            <input type="text" placeholder="操作人 / 关键词" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <button class="btn-primary">🔍 审计查询</button>
                            <button class="btn-primary" style="background-color: #34495e;">导出审计报告</button>
                        </div>
                    </div>
                    
                    <h3>敏感操作记录 (实时更新)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>风险等级</th>
                                <th>操作时间</th>
                                <th>操作人 (账号)</th>
                                <th>IP 地址</th>
                                <th>操作模块</th>
                                <th>操作行为</th>
                                <th>关键参数 / 详情</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            ${dynamicRowsHTML}

                            <tr>
                                <td><span style="background:#e74c3c; color:white; padding:2px 6px; border-radius:4px; font-size:12px;">● 高危</span></td>
                                <td>2025-11-22 14:30:05</td>
                                <td><strong>管理员 (admin)</strong></td>
                                <td>192.168.1.88</td>
                                <td>月末结账</td>
                                <td style="color: #c0392b; font-weight:bold;">执行反结账</td>
                                <td>目标期间：2025年11期</td>
                                <td><a href="javascript:void(0)" onclick="alert('快照数据已归档')" style="color:#3498db;">查看快照</a></td>
                            </tr>
                             <tr>
                                <td><span style="background:#f39c12; color:white; padding:2px 6px; border-radius:4px; font-size:12px;">● 中风险</span></td>
                                <td>2025-11-21 16:40:00</td>
                                <td>系统管理员</td>
                                <td>10.0.0.5</td>
                                <td>计费规则配置</td>
                                <td>修改规则费率</td>
                                <td>干线运费：2.5 -> 2.8</td>
                                <td><a href="javascript:void(0)" onclick="alert('变更前：2.5\\n变更后：2.8')" style="color:#3498db;">对比变更</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 27. 红冲与反结账记录 (Risk Red Stamping)
  // =========================================================================
  else if (moduleCode === "RiskRedStamping") {
    contentHTML += `
                    <h2>红冲与反结账记录</h2>
                    <p style="color: #7f8c8d;">集中记录所有涉及数据回溯、作废或反向操作的历史，确保审计链条完整。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">操作对象 (全部)</option>
                                <option>凭证红冲</option>
                                <option>单据作废</option>
                                <option>反结账</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">操作人 (全部)</option>
                                <option>张三</option>
                                <option>李四</option>
                            </select>
                            <input type="date" placeholder="操作日期范围" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <h3>红冲/反结账记录列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>记录时间</th>
                                <th>操作人</th>
                                <th>操作类型</th>
                                <th>影响期间/单据</th>
                                <th>原始单据号</th>
                                <th>操作详情</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-11-20 11:00:00</td>
                                <td>管理员</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">反结账</span></td>
                                <td>2025-10 月</td>
                                <td>-</td>
                                <td>将 10 月份从已结账状态反转</td>
                                <td><a href="#" style="color:#3498db;">查看审计日志</a></td>
                            </tr>
                            <tr>
                                <td>2025-11-19 09:10:00</td>
                                <td>李四</td>
                                <td>凭证红冲</td>
                                <td>PZ202511005</td>
                                <td>PZ202511005</td>
                                <td>红冲错误的手动凭证</td>
                                <td><a href="#" style="color:#3498db;">查看红冲凭证</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 28. 数据变更明细 (RiskDataChange) - [修复读取逻辑]
  // =========================================================================
  else if (moduleCode === "RiskDataChange") {
    // 1. 从 SessionStorage 读取动态日志
    const logsStr = sessionStorage.getItem("GlobalDataChangeLogs");
    let dynamicRowsHTML = "";

    if (logsStr) {
      const logs = JSON.parse(logsStr);
      // 遍历生成 HTML
      dynamicRowsHTML = logs
        .map(
          (log) => `
                        <tr style="background-color: #fff0f0; animation: highlight 2s;">
                            <td>${log.time}</td>
                            <td><strong>${log.user}</strong></td>
                            <td>${log.object}</td>
                            <td>${log.objId}</td>
                            <td style="color: #2980b9; font-weight:bold;">${log.field}</td>
                            <td style="color: #999; text-decoration: line-through;">${log.oldVal}</td>
                            <td style="color: #e74c3c; font-weight:bold;">${log.newVal}</td>
                            <td><a href="javascript:void(0)" onclick="viewDataChangeDetail(this)" style="color:#3498db;">查看详情</a></td>
                        </tr>
                    `
        )
        .join("");
    }

    contentHTML += `
                    <h2>数据变更明细 📝</h2>
                    <p style="color: #7f8c8d;">详细记录核心基础数据（如客户资料、科目余额、资产卡片）的每一次修改，包括修改前后的值。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="变更人 / 记录ID" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">变更对象 (全部)</option>
                                <option>客户档案</option>
                                <option>供应商档案</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <h3>数据变更记录列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 160px;">变更时间</th>
                                <th style="width: 100px;">变更人</th>
                                <th style="width: 120px;">变更对象</th>
                                <th style="width: 120px;">对象 ID</th>
                                <th style="width: 150px;">字段名称</th>
                                <th>原值 (Old)</th>
                                <th>新值 (New)</th>
                                <th style="width: 80px;">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            ${dynamicRowsHTML}

                            <tr>
                                <td>2025-11-21 16:30:00</td>
                                <td>李出纳</td>
                                <td>供应商档案</td>
                                <td>SUP-0088</td>
                                <td style="color: #c0392b; font-weight:bold;">银行账号</td>
                                <td style="color: #999; text-decoration: line-through;">6222...8888</td>
                                <td style="color: #c0392b; font-weight:bold;">6222...9999</td>
                                <td><a href="javascript:void(0)" onclick="viewDataChangeDetail(this)" style="color:#3498db;">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>2025-11-21 14:15:22</td>
                                <td>张销售</td>
                                <td>客户档案</td>
                                <td>CUST-1024</td>
                                <td style="color: #2980b9; font-weight:bold;">信用额度</td>
                                <td style="color: #999;">50,000.00</td>
                                <td style="color: #27ae60; font-weight:bold;">100,000.00</td>
                                <td><a href="javascript:void(0)" onclick="viewDataChangeDetail(this)" style="color:#3498db;">查看详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 29. 会计科目 (Acct Subject) - [全量完整版]
  // =========================================================================
  else if (moduleCode === "AcctSubject") {
    // 1. 读取存储的科目数据 (如果没有则使用默认的全量数据)
    let storedAccounts = JSON.parse(sessionStorage.getItem("AcctSubjects"));

    if (!storedAccounts) {
      // ★★★ 初始化全量科目数据 (基于的 Excel 和标准会计准则) ★★★
      storedAccounts = [
        // --- 资产类 (1) ---
        {
          code: "1001",
          name: "库存现金",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "企业的库存现金",
        },
        {
          code: "1002",
          name: "银行存款",
          type: "资产",
          direction: "借",
          aux: "银行账户",
          status: "启用",
          remark: "企业存入银行或其他金融机构的各种款项",
        },
        {
          code: "1012",
          name: "其他货币资金",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "银行汇票、本票、信用卡存款等",
        },
        {
          code: "1101",
          name: "交易性金融资产",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "短期持有的股票、债券、基金等",
        },
        {
          code: "1121",
          name: "应收票据",
          type: "资产",
          direction: "借",
          aux: "客户",
          status: "启用",
          remark: "商业汇票",
        },
        {
          code: "1122",
          name: "应收账款",
          type: "资产",
          direction: "借",
          aux: "客户",
          status: "启用",
          remark: "因销售商品、提供劳务应收取的款项",
        },
        {
          code: "1123",
          name: "预付账款",
          type: "资产",
          direction: "借",
          aux: "供应商",
          status: "启用",
          remark: "预付给供应商的款项",
        },
        {
          code: "1131",
          name: "应收股利",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "应收取的现金股利",
        },
        {
          code: "1132",
          name: "应收利息",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "应收取的利息",
        },
        {
          code: "1221",
          name: "其他应收款",
          type: "资产",
          direction: "借",
          aux: "往来单位,员工",
          status: "启用",
          remark: "除应收账款外的其他各种应收暂付款项",
        },
        {
          code: "122101",
          name: "押金",
          type: "资产",
          direction: "借",
          aux: "往来单位",
          status: "启用",
          remark: "",
        },
        {
          code: "122102",
          name: "保证金",
          type: "资产",
          direction: "借",
          aux: "往来单位",
          status: "启用",
          remark: "",
        },
        {
          code: "122103",
          name: "员工借款",
          type: "资产",
          direction: "借",
          aux: "员工",
          status: "启用",
          remark: "备用金等",
        },
        {
          code: "1231",
          name: "坏账准备",
          type: "资产",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "应收款项的备抵科目",
        },
        {
          code: "1511",
          name: "长期股权投资",
          type: "资产",
          direction: "借",
          aux: "被投资单位",
          status: "启用",
          remark: "",
        },
        {
          code: "1521",
          name: "投资性房地产",
          type: "资产",
          direction: "借",
          aux: "项目",
          status: "启用",
          remark: "为赚取租金或资本增值而持有的房地产",
        },
        {
          code: "1531",
          name: "长期应收款",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "1601",
          name: "固定资产",
          type: "资产",
          direction: "借",
          aux: "资产类别",
          status: "启用",
          remark: "使用寿命超过一年的有形资产",
        },
        {
          code: "160101",
          name: "房屋及建筑物",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "160102",
          name: "交通运输设备",
          type: "资产",
          direction: "借",
          aux: "车辆",
          status: "启用",
          remark: "物流车辆",
        },
        {
          code: "160103",
          name: "办公家具及设备",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "160104",
          name: "电子设备",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "电脑、打印机等",
        },
        {
          code: "1602",
          name: "累计折旧",
          type: "资产",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "固定资产的备抵科目",
        },
        {
          code: "1604",
          name: "在建工程",
          type: "资产",
          direction: "借",
          aux: "项目",
          status: "启用",
          remark: "正在建设中的资产",
        },
        {
          code: "1605",
          name: "工程物资",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "1606",
          name: "固定资产清理",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "1701",
          name: "无形资产",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "专利权、软件著作权等",
        },
        {
          code: "1702",
          name: "累计摊销",
          type: "资产",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "无形资产的备抵科目",
        },
        {
          code: "1801",
          name: "长期待摊费用",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "摊销期在一年以上的费用",
        },
        {
          code: "1811",
          name: "递延所得税资产",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "1901",
          name: "待处理财产损溢",
          type: "资产",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "盘盈盘亏处理",
        },

        // --- 负债类 (2) ---
        {
          code: "2001",
          name: "短期借款",
          type: "负债",
          direction: "贷",
          aux: "银行",
          status: "启用",
          remark: "1年内的借款",
        },
        {
          code: "2101",
          name: "交易性金融负债",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "2201",
          name: "应付票据",
          type: "负债",
          direction: "贷",
          aux: "供应商",
          status: "启用",
          remark: "",
        },
        {
          code: "2202",
          name: "应付账款",
          type: "负债",
          direction: "贷",
          aux: "供应商",
          status: "启用",
          remark: "购买材料、接受劳务应付的款项",
        },
        {
          code: "2203",
          name: "预收账款",
          type: "负债",
          direction: "贷",
          aux: "客户",
          status: "启用",
          remark: "预收的运费等",
        },
        {
          code: "2211",
          name: "应付职工薪酬",
          type: "负债",
          direction: "贷",
          aux: "部门",
          status: "启用",
          remark: "工资、奖金、社保等",
        },
        {
          code: "2221",
          name: "应交税费",
          type: "负债",
          direction: "贷",
          aux: "税种",
          status: "启用",
          remark: "",
        },
        {
          code: "222101",
          name: "应交增值税",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "222102",
          name: "应交企业所得税",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "222103",
          name: "应交城建税",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "222104",
          name: "应交教育费附加",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "2231",
          name: "应付利息",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "2232",
          name: "应付股利",
          type: "负债",
          direction: "贷",
          aux: "股东",
          status: "启用",
          remark: "",
        },
        {
          code: "2241",
          name: "其他应付款",
          type: "负债",
          direction: "贷",
          aux: "往来单位",
          status: "启用",
          remark: "除主营业务外的应付暂收款项",
        },
        {
          code: "224101",
          name: "代收货款",
          type: "负债",
          direction: "贷",
          aux: "客户",
          status: "启用",
          remark: "物流代收款",
        },
        {
          code: "224102",
          name: "保证金",
          type: "负债",
          direction: "贷",
          aux: "往来单位",
          status: "启用",
          remark: "",
        },
        {
          code: "2401",
          name: "递延收益",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "2501",
          name: "长期借款",
          type: "负债",
          direction: "贷",
          aux: "银行",
          status: "启用",
          remark: "1年以上的借款",
        },
        {
          code: "2701",
          name: "长期应付款",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "2801",
          name: "预计负债",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "2901",
          name: "递延所得税负债",
          type: "负债",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },

        // --- 权益类 (4) ---
        {
          code: "4001",
          name: "实收资本",
          type: "权益",
          direction: "贷",
          aux: "股东",
          status: "启用",
          remark: "投资者投入资本",
        },
        {
          code: "4002",
          name: "资本公积",
          type: "权益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "4101",
          name: "盈余公积",
          type: "权益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "从净利润中提取的公积金",
        },
        {
          code: "4103",
          name: "本年利润",
          type: "权益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "当期实现的净利润或亏损",
        },
        {
          code: "4104",
          name: "利润分配",
          type: "权益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "利润分配及历年亏损弥补",
        },

        // --- 损益类 (6) ---
        {
          code: "6001",
          name: "主营业务收入",
          type: "损益",
          direction: "贷",
          aux: "客户,项目",
          status: "启用",
          remark: "运输服务收入",
        },
        {
          code: "600110",
          name: "其他营业收入",
          type: "损益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "6051",
          name: "其他业务收入",
          type: "损益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "原材料销售、租金收入等",
        },
        {
          code: "6101",
          name: "公允价值变动损益",
          type: "损益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "6111",
          name: "投资收益",
          type: "损益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "6301",
          name: "营业外收入",
          type: "损益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "与经营无直接关系的收入",
        },
        {
          code: "6401",
          name: "主营业务成本",
          type: "损益",
          direction: "借",
          aux: "项目",
          status: "启用",
          remark: "运输成本、燃油费等",
        },
        {
          code: "6402",
          name: "其他业务成本",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "6403",
          name: "营业税金及附加",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "城建税、教育费附加等",
        },
        {
          code: "6601",
          name: "销售费用",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "销售过程中发生的费用",
        },
        {
          code: "6602",
          name: "管理费用",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "管理部门发生的费用",
        },
        {
          code: "660201",
          name: "工资",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660202",
          name: "社保费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660203",
          name: "办公费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660204",
          name: "保险费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660205",
          name: "房租费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660206",
          name: "水电费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660207",
          name: "物业费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660208",
          name: "招待费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660209",
          name: "差旅费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660210",
          name: "交通费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660211",
          name: "通讯费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660212",
          name: "修缮费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660213",
          name: "招聘费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660214",
          name: "固定资产折旧费",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "660215",
          name: "低值易耗品",
          type: "损益",
          direction: "借",
          aux: "部门",
          status: "启用",
          remark: "",
        },
        {
          code: "6603",
          name: "财务费用",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "利息支出、手续费等",
        },
        {
          code: "660301",
          name: "汇款手续费",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "660302",
          name: "代收手续费",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "660303",
          name: "利息收入",
          type: "损益",
          direction: "贷",
          aux: "无",
          status: "启用",
          remark: "注意：利息收入记财务费用贷方",
        },
        {
          code: "6701",
          name: "资产减值损失",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "6711",
          name: "营业外支出",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "与经营无直接关系的支出",
        },
        {
          code: "6801",
          name: "所得税费用",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
        {
          code: "6901",
          name: "以前年度损益调整",
          type: "损益",
          direction: "借",
          aux: "无",
          status: "启用",
          remark: "",
        },
      ];
      sessionStorage.setItem("AcctSubjects", JSON.stringify(storedAccounts));
    }

    // 2. 排序：按科目编码排序，保证父子顺序
    storedAccounts.sort((a, b) => a.code.localeCompare(b.code));

    // 3. 生成表格 HTML
    const rowsHTML = storedAccounts
      .map((item) => {
        // 计算层级
        const level = (item.code.length - 2) / 2;
        const indent = (level - 1) * 24;

        const statusColor = item.status === "启用" ? "#27ae60" : "#c0392b";
        const toggleAction = item.status === "启用" ? "停用" : "启用";
        const toggleClass =
          item.status === "启用" ? "color:#e74c3c;" : "color:#27ae60;";

        return `
                        <tr id="row-${item.code}">
                            <td>
                                <div style="padding-left:${indent}px;">
                                    <span style="color:#999; margin-right:5px;">${
                                      level > 1 ? "└─" : ""
                                    }</span>
                                    <strong>${item.code}</strong>
                                </div>
                            </td>
                            <td class="val-name">${item.name}</td>
                            <td>${item.type}</td>
                            <td>${item.aux || "-"}</td>
                            
                            <td class="val-dir">${item.direction}</td>
                            <td class="val-status"><span style="color: ${statusColor}; font-weight: bold;">${
          item.status
        }</span></td>
                            <td class="val-remark" style="color:#777; font-size:12px;">${
                              item.remark || "-"
                            }</td>
                            
                            <td>
                                <a href="javascript:void(0)" onclick="editSubject('${
                                  item.code
                                }')" style="color:#3498db;">编辑</a> | 
                                <a href="javascript:void(0)" onclick="toggleSubjectStatus('${
                                  item.code
                                }')" style="${toggleClass}">${toggleAction}</a>
                            </td>
                        </tr>
                    `;
      })
      .join("");

    contentHTML += `
                    <h2>会计科目 </h2>
                    <p style="color: #7f8c8d;">管理企业的会计科目体系。支持多级科目设置（如 1001 -> 100101）。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="科目编码 / 名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;" onclick="addSubject()">+ 新增科目</button>
                        <button class="btn-primary" style="background-color: #3498db;">导入科目表</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 180px;">科目编码</th>
                                <th>科目名称</th>
                                <th>科目类型</th>
                                <th>辅助核算</th>
                                <th style="width: 80px;">余额方向</th>
                                <th style="width: 80px;">状态</th>
                                <th>备注</th>
                                <th style="width: 120px;">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 30. 会计账套 (Acct Set)
  // =========================================================================
  else if (moduleCode === "AcctSet") {
    contentHTML += `
                    <h2>会计账套</h2>
                    <p style="color: #7f8c8d;">管理和配置多套会计主体（如总账套、子公司账套），确保独立核算。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="账套名称 / 编码" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增会计账套</button>
                    </div>

                    <h3>会计账套列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>账套编码</th>
                                <th>账套名称</th>
                                <th>启用日期</th>
                                <th>记账本位币</th>
                                <th>当前期间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>集团总账套 (合并主体)</td>
                                <td>2024-01-01</td>
                                <td>RMB</td>
                                <td>2025年11期</td>
                                <td><a href="#" style="color:#3498db;">设置</a> | <a href="#" style="color:#f39c12;">切换</a></td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>华南子公司账套</td>
                                <td>2025-01-01</td>
                                <td>RMB</td>
                                <td>2025年11期</td>
                                <td><a href="#" style="color:#3498db;">设置</a> | <a href="#" style="color:#f39c12;">切换</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 31. 会计期间 (Acct Period) - 的最新修改版
  // =========================================================================
  else if (moduleCode === "AcctPeriod") {
    contentHTML += `
                    <h2>会计期间</h2>
                    <p style="color: #7f8c8d;">定义和控制账务处理的月份期间，支持多核算主体的期间管理。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
                            <span style="font-weight:bold; color:#555;">当前核算主体：</span>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px; font-weight:bold;">
                                <option>上海总部账套 (默认)</option>
                                <option>广州分拨账套</option>
                                <option>北京分拨账套</option>
                            </select>
                            
                            <div style="width: 1px; height: 20px; background: #ddd; margin: 0 10px;"></div>
                            
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">年度</option>
                                <option selected>2025</option>
                                <option>2024</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #f39c12;">🔄 重算本期余额</button>
                        <button class="btn-primary" style="background-color: #34495e;">🔒 年终永久封账</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>会计期间</th>
                                <th>起止日期</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025年1期</td>
                                <td>2025-1-01 ~ 1-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年2期</td>
                                <td>2025-2-01 ~ 2-28</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年3期</td>
                                <td>2025-3-01 ~ 3-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年4期</td>
                                <td>2025-4-01 ~ 4-30</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年5期</td>
                                <td>2025-5-01 ~ 5-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年6期</td>
                                <td>2025-6-01 ~ 6-30</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年7期</td>
                                <td>2025-7-01 ~ 7-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年8期</td>
                                <td>2025-8-01 ~ 8-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年9期</td>
                                <td>2025-9-01 ~ 9-30</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#27ae60;border-radius:50%;margin-right:5px;"></span>已完结(已记账)</td>
                                <td><a href="#" style="color:#27ae60;">期末结账</a></td>
                            </tr>
                             <tr>
                                <td>2025年10期</td>
                                <td>2025-10-01 ~ 10-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:gray;border-radius:50%;margin-right:5px;"></span>已关闭</td>
                                <td><a href="#" style="color:gray;">反结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年11期</td>
                                <td>2025-11-01 ~ 11-30</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:red;border-radius:50%;margin-right:5px;"></span>进行中 (已记账)</td>
                                <td><a href="#" style="color:red;">期末结账</a></td>
                            </tr>
                            <tr>
                                <td>2025年12期</td>
                                <td>2025-12-01 ~ 12-31</td>
                                <td><span style="display:inline-block;width:8px;height:8px;background:#f1c40f;border-radius:50%;margin-right:5px;"></span>未开启</td>
                                <td><span style="color:#999;">待上期结账后开启</span></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 32. 辅助核算项 (Acct Auxiliary)
  // =========================================================================
  else if (moduleCode === "AcctAuxiliary") {
    contentHTML += `
                    <h2>辅助核算项</h2>
                    <p style="color: #7f8c8d;">定义和管理除科目外的附加核算维度（如客户、供应商、项目、部门），用于精细化管理分析。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="辅助项名称 / 编码" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增辅助核算项</button>
                    </div>

                    <h3>辅助核算项列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>辅助项名称</th>
                                <th>编码</th>
                                <th>用途说明</th>
                                <th>关联科目数</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>客户</td>
                                <td>CUSTOMER</td>
                                <td>应收、收入核算</td>
                                <td>15</td>
                                <td><a href="#" style="color:#3498db;">查看使用情况</a> | <a href="#" style="color:#f39c12;">设置</a></td>
                            </tr>
                            <tr>
                                <td>部门</td>
                                <td>DEPT</td>
                                <td>费用、成本分摊核算</td>
                                <td>25</td>
                                <td><a href="#" style="color:#3498db;">查看使用情况</a> | <a href="#" style="color:#f39c12;">设置</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 33. 记账规则 (Acct Rule)
  // =========================================================================
  else if (moduleCode === "AcctRule") {
    contentHTML += `
                    <h2>记账规则</h2>
                    <p style="color: #7f8c8d;">配置业务单据（如运单、结算单）自动生成会计凭证的逻辑规则，实现业财一体化。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">业务类型 (全部)</option>
                                <option>运费收入</option>
                                <option>供应商付款</option>
                                <option>费用报销</option>
                            </select>
                            <input type="text" placeholder="规则名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 新增记账规则</button>
                    </div>

                    <h3>记账规则列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>规则名称</th>
                                <th>业务类型</th>
                                <th>触发条件</th>
                                <th>目标科目</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>应收运费收入</td>
                                <td>运单收入</td>
                                <td>运单状态 = 已完成</td>
                                <td>借：应收账款，贷：主营业务收入</td>
                                <td><span style="color: #27ae60;">启用</span></td>
                                <td><a href="#" style="color:#3498db;">编辑</a> | <a href="#" style="color:#f39c12;">模拟测试</a></td>
                            </tr>
                            <tr>
                                <td>干线费应付</td>
                                <td>干线结算</td>
                                <td>批次状态 = 已确认</td>
                                <td>借：运输成本，贷：应付账款</td>
                                <td><span style="color: #27ae60;">启用</span></td>
                                <td><a href="#" style="color:#3498db;">编辑</a> | <a href="#" style="color:#f39c12;">模拟测试</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 34. 资产卡片 (AssetCard) - [数据增强版：含无形资产]
  // =========================================================================
  else if (moduleCode === "AssetCard") {
    // 1. 读取数据 (如果为空，则初始化 6 条典型数据)
    let assets = JSON.parse(sessionStorage.getItem("AssetCards"));

    if (!assets || assets.length === 0) {
      assets = [
        // 1. 固定资产 - 生产工具 (重卡)
        {
          code: "FA-TRUCK-001",
          name: "斯堪尼亚重卡 (苏E88888)",
          category: "运输车辆",
          dept: "运输部",
          model: "G450",
          originalValue: "850,000.00",
          accumulatedDepr: "150,000.00",
          netValue: "700,000.00",
          status: "使用中",
          image: "https://img.icons8.com/color/96/truck.png",
        },
        // 2. 固定资产 - 配送工具 (轻客)
        {
          code: "FA-VAN-005",
          name: "公司打印机电脑设备",
          category: "公司设备",
          dept: "行政部",
          model: "N800",
          originalValue: "120,000.00",
          accumulatedDepr: "20,000.00",
          netValue: "100,000.00",
          status: "使用中",
          image: "img/computer.ico",
        },
        // 3. ★ 无形资产 - 软件 (您特别要求的)
        {
          code: "IA-SOFT-001",
          name: "自研物流CRM管理系统",
          category: "无形资产",
          dept: "研发部",
          model: "V2.0 企业版",
          originalValue: "500,000.00",
          accumulatedDepr: "100,000.00",
          netValue: "400,000.00",
          status: "使用中",
          image: "https://img.icons8.com/color/100/code.png",
        },
        // 4. 固定资产 - 仓储设备
        {
          code: "FA-EQP-022",
          name: "合力3吨柴油叉车",
          category: "仓储设备",
          dept: "仓储部",
          model: "CPCD30",
          originalValue: "65,000.00",
          accumulatedDepr: "15,000.00",
          netValue: "50,000.00",
          status: "使用中",
          image: "https://img.icons8.com/color/97/fork-lift.png",
        },
        // 5. 无形资产 - 资质许可
        {
          code: "IA-LIC-002",
          name: "道路运输经营许可证",
          category: "无形资产",
          dept: "总经办",
          model: "长期许可",
          originalValue: "20,000.00",
          accumulatedDepr: "5,000.00",
          netValue: "15,000.00",
          status: "使用中",
          image: "https://img.icons8.com/color/98/certificate.png",
        },
        // 6. 其他资产 - 办公装修
        {
          code: "OA-DEC-001",
          name: "总部办公室装修工程",
          category: "长期待摊费用",
          dept: "行政部",
          model: "-",
          originalValue: "300,000.00",
          accumulatedDepr: "120,000.00",
          netValue: "180,000.00",
          status: "使用中",
          image: "img/fixHouse.ico",
        },
      ];
      sessionStorage.setItem("AssetCards", JSON.stringify(assets));
    }

    // 2. 生成表格行 (保持之前的逻辑)
    const rows = assets
      .map((a) => {
        const imgUrl = a.image || "https://via.placeholder.com/40?text=Asset";
        const statusColor = a.status === "使用中" ? "#27ae60" : "#999";
        // 特殊标记无形资产
        const typeLabel =
          a.category === "无形资产"
            ? '<span style="background:#e6f7ff; color:#1890ff; font-size:10px; padding:2px 4px; border-radius:2px;">无形</span> '
            : "";

        return `
                        <tr>
                            <td style="text-align:center;">
                                <img src="${imgUrl}" style="width: 32px; height: 32px; object-fit: contain; cursor: pointer;" title="点击预览">
                            </td>
                            <td>
                                <div style="font-weight:bold; color:#2980b9;">${a.code}</div>
                                <div style="font-size:12px; color:#666;">${typeLabel}${a.category}</div>
                            </td>
                            <td>
                                <div>${a.name}</div>
                                <div style="font-size:12px; color:#999;">${a.model}</div>
                            </td>
                            <td>${a.dept}</td>
                            <td style="text-align:right;">${a.originalValue}</td>
                            <td style="text-align:right; color:#e74c3c;">${a.accumulatedDepr}</td>
                            <td style="text-align:right; font-weight:bold;">${a.netValue}</td>
                            <td><span style="color:${statusColor}; font-weight:bold;">${a.status}</span></td>
                            <td>
                                <a href="javascript:void(0)" onclick="editAssetCard('${a.code}')" style="color:#3498db;">编辑</a> | 
                                <a href="javascript:void(0)" onclick="disposeAsset(this, '${a.code}')" style="color:#e74c3c;">处置</a>
                            </td>
                        </tr>
                    `;
      })
      .join("");

    contentHTML += `
                    <h2>固定/无形资产卡片 </h2>
                    <p style="color: #7f8c8d;">统一管理公司的固定资产（车辆、设备）及无形资产（软件、牌照），支持分类折旧与摊销。</p>
                    
                    <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px; border-radius:6px;">
                        <div style="display: flex; gap: 15px; align-items:center;">
                            <input type="text" placeholder="资产名称/编码" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">资产类别 (全部)</option>
                                <option>运输车辆</option>
                                <option>无形资产</option>
                                <option>仓储设备</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;" onclick="openAddAssetModal()">+ 新增资产</button>
                        <button class="btn-primary" style="background-color: #f39c12;">打印盘点表</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width:50px;">图</th>
                                <th>资产编码/类别</th>
                                <th>资产名称/规格</th>
                                <th>部门</th>
                                <th style="text-align:right;">原值</th>
                                <th style="text-align:right;">累计折旧/摊销</th>
                                <th style="text-align:right;">净值</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                    
                    `;
  }


  // =========================================================================
  // 60. 司机档案管理 (DriverProfile) - [运力中心核心]
  // =========================================================================
  else if (moduleCode === "DriverProfile") {
    // 1. 初始化模拟数据 (包含资质、车型、评级)
    let drivers = JSON.parse(sessionStorage.getItem('DriverList'));
    if (!drivers || drivers.length === 0) {
      drivers = [
        {
          id: "DRV-2025001", name: "张伟", phone: "13811112222",
          plate: "沪A·B8899", carType: "17.5米 | 厢式", 
          license: "A2", certStatus: "正常", expiryDate: "2026-05-20",
          bankCard: "建设银行 (尾号8899)", deposit: 5000.00,
          score: 4.9, status: "启用", tags: ["金牌司机", "干线专跑"]
        },
        {
          id: "DRV-2025002", name: "李强", phone: "13900009999",
          plate: "苏E·X7788", carType: "9.6米 | 高栏", 
          license: "B2", certStatus: "即将过期", expiryDate: "2025-12-01",
          bankCard: "招商银行 (尾号1234)", deposit: 2000.00,
          score: 4.5, status: "启用", tags: ["短途王"]
        },
        {
          id: "DRV-2025003", name: "王建国", phone: "15066667777",
          plate: "浙B·C5566", carType: "4.2米 | 厢式", 
          license: "C1", certStatus: "已过期", expiryDate: "2024-11-01",
          bankCard: "-", deposit: 0.00,
          score: 3.2, status: "黑名单", tags: ["多次货损", "投诉多"]
        }
      ];
      sessionStorage.setItem('DriverList', JSON.stringify(drivers));
    }

    // 2. 渲染列表
    const rows = drivers.map(d => {
        // 状态与资质样式
        let statusStyle = d.status === '启用' ? 'color:#27ae60; background:#f0f9f0;' : 'color:#e74c3c; background:#fff0f0;';
        
        let certBadge = "";
        if(d.certStatus === '正常') certBadge = `<span style="color:#27ae60">✔ 正常</span>`;
        else if(d.certStatus === '即将过期') certBadge = `<span style="color:#f39c12; font-weight:bold;">⚠️ 30天内过期</span>`;
        else certBadge = `<span style="color:#e74c3c; font-weight:bold;">🚫 已过期</span>`;

        // 标签渲染
        const tagHtml = d.tags.map(t => `<span style="font-size:10px; border:1px solid #ccc; padding:1px 4px; border-radius:3px; color:#666; margin-right:3px;">${t}</span>`).join('');

        // 评分星星
        const stars = "⭐".repeat(Math.floor(d.score));

        return `
            <tr>
                <td>
                    <div style="font-weight:bold; color:#2980b9; cursor:pointer;" onclick="viewDriverDetail('${d.id}')">${d.name}</div>
                    <div style="font-size:12px; color:#666;">${d.phone}</div>
                </td>
                <td>
                    <div style="font-weight:bold;">${d.plate}</div>
                    <div style="font-size:12px; color:#999;">${d.carType}</div>
                </td>
                <td>
                    <div>${d.license} 驾照</div>
                    <div style="font-size:12px;">有效期至: ${d.expiryDate}</div>
                </td>
                <td>${certBadge}</td>
                <td style="text-align:right;">
                    <div>押金: <span style="font-weight:bold;">${d.deposit.toLocaleString()}</span></div>
                    <div style="font-size:12px; color:#999;">${d.bankCard}</div>
                </td>
                <td>
                    <div style="color:#f39c12;">${d.score} ${stars}</div>
                    <div style="margin-top:2px;">${tagHtml}</div>
                </td>
                <td><span style="padding:2px 6px; border-radius:4px; font-size:12px; ${statusStyle}">${d.status}</span></td>
                <td>
                    <a href="javascript:void(0)" onclick="viewDriverDetail('${d.id}')" style="color:#3498db;">详情</a>
                    <span style="color:#ddd">|</span>
                    ${d.status === '黑名单' 
                      ? `<a href="javascript:void(0)" onclick="toggleDriverStatus('${d.id}')" style="color:#27ae60;">解禁</a>`
                      : `<a href="javascript:void(0)" onclick="toggleDriverStatus('${d.id}')" style="color:#e74c3c;">拉黑</a>`
                    }
                </td>
            </tr>
        `;
    }).join('');

    contentHTML += `
        <h2>司机档案库  🚚</h2>
        <p style="color: #7f8c8d;">全平台运力资源中心。管理司机 <b>身份资质</b>、<b>车辆信息</b>、<b>收款账户</b> 及 <b>信用评级</b>。</p>

        <div class="dashboard-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:20px;">
            <div class="kpi-card" style="border-top: 4px solid #3498db;">
                <div class="kpi-title">👨‍✈️ 注册司机总数</div>
                <div class="kpi-value">3,420</div>
                <div class="kpi-trend">本月新增 +45</div>
            </div>
            <div class="kpi-card" style="border-top: 4px solid #27ae60;">
                <div class="kpi-title">✅ 活跃/接单中</div>
                <div class="kpi-value" style="color:#27ae60;">1,208</div>
                <div class="kpi-trend">运力利用率 35%</div>
            </div>
            <div class="kpi-card" style="border-top: 4px solid #f39c12;">
                <div class="kpi-title">⚠️ 证件临期/过期</div>
                <div class="kpi-value" style="color:#f39c12;">12</div>
                <div class="kpi-trend">需立即介入审核</div>
            </div>
            <div class="kpi-card" style="border-top: 4px solid #e74c3c;">
                <div class="kpi-title">🚫 黑名单/冻结</div>
                <div class="kpi-value" style="color:#e74c3c;">5</div>
                <div class="kpi-trend">严重违规拦截</div>
            </div>
        </div>

        <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px; border-radius:6px; display:flex; justify-content:space-between;">
            <div style="display:flex; gap:10px;">
                <input type="text" placeholder="姓名/手机号" style="padding:8px; border:1px solid #ccc; width:140px;">
                <input type="text" placeholder="车牌号" style="padding:8px; border:1px solid #ccc; width:120px;">
                <select style="padding:8px; border:1px solid #ccc;">
                    <option>所有车型</option>
                    <option>17.5米</option>
                    <option>9.6米</option>
                    <option>4.2米</option>
                </select>
                <select style="padding:8px; border:1px solid #ccc;">
                    <option>所有状态</option>
                    <option>正常</option>
                    <option>临期预警</option>
                    <option>黑名单</option>
                </select>
                <button class="btn-primary">查询</button>
            </div>
            <div>
                
                <button class="btn-primary" style="background:#27ae60;">+ 新增司机</button>
            </div>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>司机信息</th>
                    <th>主驾车辆</th>
                    <th>资质/证件效期</th>
                    <th>合规状态</th>
                    <th style="text-align:right;">财务信息</th>
                    <th>信用评分</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
  }

  // =========================================================================
  // 61. 司机详情页 (DriverProfileDetail) - [360度画像]
  // =========================================================================
  else if (moduleCode === "DriverProfileDetail") {
      const driverId = window.g_currentDriverId || "DRV-2025001";
      // 实际开发中根据ID从数据库取，这里模拟取第一条
      const d = JSON.parse(sessionStorage.getItem('DriverList'))[0]; 

      contentHTML += `
        <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <button class="btn-primary" style="background:#95a5a6; padding:5px 15px;" onclick="loadContent('DriverProfile')"> < 返回列表</button>
                <h2 style="display:inline-block; margin-left:15px; vertical-align:middle;">司机档案：<span style="color:#2980b9;">${d.name}</span> <span style="font-size:14px; color:#666; font-weight:normal;">(${d.phone})</span></h2>
            </div>
            <div>
                 <button class="btn-primary" style="background:#e67e22;" onclick="alert('已发送更新证件通知短信')">🔔 催更证件</button>
                 <button class="btn-primary">💾 保存修改</button>
            </div>
        </div>

        <div style="display:flex; gap:20px; align-items:flex-start;">
            
            <div style="width:250px; background:white; padding:20px; border-radius:8px; text-align:center; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <div style="width:100px; height:100px; background:#eee; border-radius:50%; margin:0 auto 15px; display:flex; align-items:center; justify-content:center; font-size:40px;">👨‍✈️</div>
                <h3 style="margin:0;">${d.name}</h3>
                <p style="color:#666; font-size:13px;">注册日期：2023-01-15</p>
                <div style="margin:15px 0; border-top:1px solid #eee; border-bottom:1px solid #eee; padding:15px 0;">
                    <div style="font-size:24px; color:#f39c12; font-weight:bold;">${d.score}</div>
                    <div style="font-size:12px; color:#999;">综合评分 (5.0满分)</div>
                </div>
                <div style="text-align:left; font-size:13px; line-height:2;">
                    <div>累计接单：<span style="float:right; font-weight:bold;">1,203 单</span></div>
                    <div>准点率：<span style="float:right; font-weight:bold; color:#27ae60;">98.5%</span></div>
                    <div>货损率：<span style="float:right; font-weight:bold;">0.01%</span></div>
                </div>
            </div>

            <div style="flex:1; background:white; padding:20px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                
                <div style="border-bottom:1px solid #eee; margin-bottom:20px; display:flex; gap:30px;">
                    <div style="padding-bottom:10px; border-bottom:3px solid #3498db; color:#3498db; font-weight:bold; cursor:pointer;">基本信息</div>
                    <div style="padding-bottom:10px; cursor:pointer; color:#666;">车辆绑定 (2)</div>
                    <div style="padding-bottom:10px; cursor:pointer; color:#666;">收款账户</div>
                    <div style="padding-bottom:10px; cursor:pointer; color:#666;">证件影像</div>
                </div>

                <h4 style="border-left:4px solid #3498db; padding-left:10px; margin-top:0;">👤 身份信息</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px; margin-bottom:20px;">
                    <div><label style="color:#999; font-size:12px;">身份证号</label><div style="font-weight:bold;">32010219800101XXXX</div></div>
                    <div><label style="color:#999; font-size:12px;">驾驶证档案号</label><div style="font-weight:bold;">123456789012</div></div>
                    <div><label style="color:#999; font-size:12px;">准驾车型</label><div style="font-weight:bold;">${d.license} (包含C1/B2)</div></div>
                    <div><label style="color:#999; font-size:12px;">初次领证日期</label><div>2010-05-20 (驾龄15年)</div></div>
                    <div><label style="color:#999; font-size:12px;">从业资格证号</label><div>320000001122</div></div>
                    <div><label style="color:#999; font-size:12px;">证件有效期</label><div style="color:#27ae60;">${d.expiryDate}</div></div>
                </div>

                <h4 style="border-left:4px solid #f39c12; padding-left:10px;">🚚 常用车辆</h4>
                <table class="data-table" style="margin-bottom:20px;">
                    <thead><tr><th>车牌号</th><th>类型</th><th>载重</th><th>绑定时间</th><th>状态</th></tr></thead>
                    <tbody>
                        <tr><td>${d.plate}</td><td>${d.carType}</td><td>30吨</td><td>2023-01-15</td><td><span style="color:#27ae60">● 使用中</span></td></tr>
                        <tr><td>苏E·88888</td><td>9.6米 高栏</td><td>18吨</td><td>2024-06-10</td><td><span style="color:#999">● 备用</span></td></tr>
                    </tbody>
                </table>

                <h4 style="border-left:4px solid #27ae60; padding-left:10px;">💳 结算账户 (用于运费打款)</h4>
                <div style="background:#f9f9f9; padding:15px; border-radius:6px; border:1px dashed #ccc;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span style="font-weight:bold;">中国建设银行 (储蓄卡)</span>
                        <span style="color:#27ae60;">✅ 鉴权通过</span>
                    </div>
                    <div>卡号：6217 0000 8888 9999</div>
                    <div>户名：张伟</div>
                    <div>开户行：建行上海浦东支行</div>
                </div>

            </div>
        </div>
      `;
  }

  // =========================================================================
  // 61. 司机详情页 (DriverProfileDetail) - [360度画像]
  // =========================================================================
  else if (moduleCode === "DriverList") {
      const driverId = window.g_currentDriverId || "DRV-2025001";
      // 实际开发中根据ID从数据库取，这里模拟取第一条
      const d = JSON.parse(sessionStorage.getItem('DriverList'))[0]; 

      contentHTML += `
        <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <button class="btn-primary" style="background:#95a5a6; padding:5px 15px;" onclick="loadContent('DriverProfile')"> < 返回列表</button>
                <h2 style="display:inline-block; margin-left:15px; vertical-align:middle;">司机档案：<span style="color:#2980b9;">${d.name}</span> <span style="font-size:14px; color:#666; font-weight:normal;">(${d.phone})</span></h2>
            </div>
            <div>
                 <button class="btn-primary" style="background:#e67e22;" onclick="alert('已发送更新证件通知短信')">🔔 催更证件</button>
                 <button class="btn-primary">💾 保存修改</button>
            </div>
        </div>

        <div style="display:flex; gap:20px; align-items:flex-start;">
            
            <div style="width:250px; background:white; padding:20px; border-radius:8px; text-align:center; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <div style="width:100px; height:100px; background:#eee; border-radius:50%; margin:0 auto 15px; display:flex; align-items:center; justify-content:center; font-size:40px;">👨‍✈️</div>
                <h3 style="margin:0;">${d.name}</h3>
                <p style="color:#666; font-size:13px;">注册日期：2023-01-15</p>
                <div style="margin:15px 0; border-top:1px solid #eee; border-bottom:1px solid #eee; padding:15px 0;">
                    <div style="font-size:24px; color:#f39c12; font-weight:bold;">${d.score}</div>
                    <div style="font-size:12px; color:#999;">综合评分 (5.0满分)</div>
                </div>
                <div style="text-align:left; font-size:13px; line-height:2;">
                    <div>累计接单：<span style="float:right; font-weight:bold;">1,203 单</span></div>
                    <div>准点率：<span style="float:right; font-weight:bold; color:#27ae60;">98.5%</span></div>
                    <div>货损率：<span style="float:right; font-weight:bold;">0.01%</span></div>
                </div>
            </div>

            <div style="flex:1; background:white; padding:20px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                
                <div style="border-bottom:1px solid #eee; margin-bottom:20px; display:flex; gap:30px;">
                    <div style="padding-bottom:10px; border-bottom:3px solid #3498db; color:#3498db; font-weight:bold; cursor:pointer;">基本信息</div>
                    <div style="padding-bottom:10px; cursor:pointer; color:#666;">车辆绑定 (2)</div>
                    <div style="padding-bottom:10px; cursor:pointer; color:#666;">收款账户</div>
                    <div style="padding-bottom:10px; cursor:pointer; color:#666;">证件影像</div>
                </div>

                <h4 style="border-left:4px solid #3498db; padding-left:10px; margin-top:0;">👤 身份信息</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px; margin-bottom:20px;">
                    <div><label style="color:#999; font-size:12px;">身份证号</label><div style="font-weight:bold;">32010219800101XXXX</div></div>
                    <div><label style="color:#999; font-size:12px;">驾驶证档案号</label><div style="font-weight:bold;">123456789012</div></div>
                    <div><label style="color:#999; font-size:12px;">准驾车型</label><div style="font-weight:bold;">${d.license} (包含C1/B2)</div></div>
                    <div><label style="color:#999; font-size:12px;">初次领证日期</label><div>2010-05-20 (驾龄15年)</div></div>
                    <div><label style="color:#999; font-size:12px;">从业资格证号</label><div>320000001122</div></div>
                    <div><label style="color:#999; font-size:12px;">证件有效期</label><div style="color:#27ae60;">${d.expiryDate}</div></div>
                </div>

                <h4 style="border-left:4px solid #f39c12; padding-left:10px;">🚚 常用车辆</h4>
                <table class="data-table" style="margin-bottom:20px;">
                    <thead><tr><th>车牌号</th><th>类型</th><th>载重</th><th>绑定时间</th><th>状态</th></tr></thead>
                    <tbody>
                        <tr><td>${d.plate}</td><td>${d.carType}</td><td>30吨</td><td>2023-01-15</td><td><span style="color:#27ae60">● 使用中</span></td></tr>
                        <tr><td>苏E·88888</td><td>9.6米 高栏</td><td>18吨</td><td>2024-06-10</td><td><span style="color:#999">● 备用</span></td></tr>
                    </tbody>
                </table>

                <h4 style="border-left:4px solid #27ae60; padding-left:10px;">💳 结算账户 (用于运费打款)</h4>
                <div style="background:#f9f9f9; padding:15px; border-radius:6px; border:1px dashed #ccc;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span style="font-weight:bold;">中国建设银行 (储蓄卡)</span>
                        <span style="color:#27ae60;">✅ 鉴权通过</span>
                    </div>
                    <div>卡号：6217 0000 8888 9999</div>
                    <div>户名：张伟</div>
                    <div>开户行：建行上海浦东支行</div>
                </div>

            </div>
        </div>
      `;
  }

  // =========================================================================
  // 35. 折旧计算 (Asset Depreciation)
  // =========================================================================
  else if (moduleCode === "AssetDepreciation") {
    contentHTML += `
                    <h2>折旧计算</h2>
                    <p style="color: #7f8c8d;">执行每月固定资产折旧的自动计算、预览和记账凭证生成。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">会计期间</option>
                                <option>2025年11期</option>
                                <option>2025年10期</option>
                            </select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">计算状态</option>
                                <option>待计算</option>
                                <option>已完成</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">执行本月折旧计算</button>
                        <button class="btn-primary" style="background-color: #3498db;">生成折旧凭证</button>
                    </div>

                    <h3>折旧计算结果 (2025年11期)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>折旧期间</th>
                                <th>资产总数</th>
                                <th>参与折旧资产数</th>
                                <th>本期折旧总额 (RMB)</th>
                                <th>计算状态</th>
                                <th>凭证状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025年11期</td>
                                <td>150</td>
                                <td>148</td>
                                <td>38,500.00</td>
                                <td><span style="color: #27ae60;">已完成</span></td>
                                <td><span style="color: #f39c12;">待生成</span></td>
                                <td><a href="#" style="color:#3498db;">查看明细</a> | <a href="#" style="color:#3498db;">生成凭证</a></td>
                            </tr>
                            <tr>
                                <td>2025年10期</td>
                                <td>150</td>
                                <td>148</td>
                                <td>38,500.00</td>
                                <td><span style="color: #27ae60;">已完成</span></td>
                                <td><span style="color: #27ae60;">已生成</span></td>
                                <td><a href="#" style="color:#3498db;">查看凭证</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 36. 资产变动 (Asset Change)
  // =========================================================================
  else if (moduleCode === "AssetChange") {
    contentHTML += `
                    <h2>资产变动</h2>
                    <p style="color: #7f8c8d;">记录固定资产的增加、减少、转移和价值调整等变动事件。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="资产编码 / 变动单号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">变动类型 (全部)</option>
                                <option>新增</option>
                                <option>报废</option>
                                <option>部门转移</option>
                            </select>
                            <input type="date" placeholder="变动日期范围" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">+ 登记新增资产</button>
                        <button class="btn-primary" style="background-color: #f39c12;">登记资产处置</button>
                    </div>

                    <h3>资产变动记录列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>变动单号</th>
                                <th>资产名称</th>
                                <th>变动类型</th>
                                <th>变动日期</th>
                                <th>涉及金额 (RMB)</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ZD20251101</td>
                                <td>重型牵引车 02</td>
                                <td><span style="color: #27ae60;">新增</span></td>
                                <td>2025-11-15</td>
                                <td>380,000.00</td>
                                <td><span style="color: #27ae60;">已完成</span></td>
                                <td><a href="#" style="color:#3498db;">查看卡片</a></td>
                            </tr>
                            <tr>
                                <td>ZD20251102</td>
                                <td>旧打印机</td>
                                <td><span style="color: #e74c3c;">报废</span></td>
                                <td>2025-11-18</td>
                                <td>-1,500.00 (处置损失)</td>
                                <td><span style="color: #27ae60;">已完成</span></td>
                                <td><a href="#" style="color:#3498db;">查看详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 37. 凭证录入 (VoucherEntryReview) - [智能交互重构版]
  // =========================================================================
  else if (moduleCode === "VoucherEntryReview") {
    // 1. 读取历史凭证列表 (保持不变)
    const savedVouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    // 生成列表行 HTML (保持不变，省略部分重复代码，直接用之前的 logic)
    const voucherRows = savedVouchers
      .map((v) => {
        let statusColor =
          v.status === "已审核" || v.status === "已记账"
            ? "#27ae60"
            : "#f39c12";
        return `<tr>
            <td>${v.id}</td>
            <td>${v.date}</td>
            <td style="text-align:right; font-weight:bold;">${v.amount}</td>
            <td>${v.user}</td>
            <td><span style="color: ${statusColor}; font-weight: bold;">${v.status}</span></td>
            <td><a href="javascript:void(0)" onclick="openVoucherDetail(this)" style="color:#3498db;">查看</a></td>
        </tr>`;
      })
      .join("");

    contentHTML += `
        <h2>凭证录入 </h2>
        <p style="color: #7f8c8d;">选择业务场景和结算方式，系统将自动生成标准凭证。</p>

        <div class="action-bar" style="margin-bottom: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">
            <button class="btn-primary" style="background-color: #27ae60;" onclick="resetSmartForm()">🔄 重置表单</button>
            <div style="float:right; font-weight: bold; color: #2980b9;">
                凭证号：<span id="current-v-id">记${new Date().getFullYear()}11${Math.floor(
      Math.random() * 1000 + 1000
    )}</span>
            </div>
        </div>
        
        <div style="display: flex; gap: 20px; align-items: flex-start;">
            
            <div style="flex: 1; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #eee;">
                <h3 style="margin-top:0; color:#333; border-bottom:1px solid #eee; padding-bottom:10px;">📝 业务信息录入</h3>
                
                <div style="margin-bottom: 15px;">
                    <label style="display:block; color:#666; font-size:12px; margin-bottom:5px;">业务场景 (对方科目)</label>
                    <select id="biz-scenario" class="smart-input" onchange="updateSmartPreview()" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px; font-weight:bold;">
                        <option value="income" data-subject="6001 主营业务收入" data-dir="credit">收取运费收入</option>
                        <option value="ar_cost" data-subject="1122 应收账款" data-dir="credit">收回客户欠款 (核销应收)</option>
                        <option value="cost" data-subject="6401 主营业务成本" data-dir="debit">支付司机运费</option>
                        <option value="exp_admin" data-subject="6602 管理费用" data-dir="debit">支付办公/行政费用</option>
                        <option value="tax" data-subject="2221 应交税费" data-dir="debit">缴纳税款</option>
                    </select>
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display:block; color:#666; font-size:12px; margin-bottom:5px;">往来单位 / 摘要补充</label>
                    <input type="text" id="biz-summary" class="smart-input" oninput="updateSmartPreview()" placeholder="例如：Google科技技术有限公司 / 11月房租" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display:block; color:#666; font-size:12px; margin-bottom:5px;">金额 (RMB)</label>
                    <input type="number" id="biz-amount" class="smart-input" oninput="updateSmartPreview()" placeholder="0.00" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px; font-size:16px; color:#e74c3c; font-weight:bold;">
                </div>

                <div style="margin-bottom: 25px;">
                    <label style="display:block; color:#2980b9; font-size:12px; margin-bottom:5px; font-weight:bold;">资金账户 / 结算方式</label>
                    <select id="settlement-account" class="smart-input" onchange="updateSmartPreview()" style="width:100%; padding:10px; border:1px solid #2980b9; border-radius:4px; background:#f0f7ff;">
                        <option value="bank_icbc" data-subject="100201 银行存款-工行" data-type="money">🏦 工商银行基本户</option>
                        <option value="bank_ali" data-subject="101201 其他货币资金-支付宝" data-type="money">📱 企业支付宝</option>
                        <option value="cash" data-subject="1001 库存现金" data-type="money">💴 财务部现金</option>
                        <option disabled>──────────</option>
                        <option value="offset_ap" data-subject="2202 应付账款" data-type="transfer">🔄 供应商抵扣 (挂账)</option>
                        <option value="offset_ar" data-subject="1122 应收账款" data-type="transfer">🔄 客户预收冲抵</option>
                    </select>
                </div>

                <div style="text-align: right;">
                    <button class="btn-primary" style="background-color: #3498db; padding: 10px 30px;" onclick="saveSmartVoucher()">💾 确认并保存凭证</button>
                </div>
            </div>

            <div style="flex: 1.2; background: #fdfdfd; padding: 20px; border-radius: 8px; border: 1px dashed #bbb;">
                <h3 style="margin-top:0; color:#555; display:flex; justify-content:space-between;">
                    <span>📜 凭证实时预览</span>
                    <span id="preview-tag" style="background:#27ae60; color:#fff; padding:2px 8px; border-radius:4px; font-size:14px;">收款凭证</span>
                </h3>
                
                <div class="voucher-preview-card" style="border:1px solid #333; margin-top:15px; background:#fff; padding:10px;">
                    <div style="text-align:center; font-size:18px; font-weight:bold; margin-bottom:10px; border-bottom:1px double #ccc; padding-bottom:5px;">
                        记 账 凭 证
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px;">
                        <span>日期：<span id="preview-date">${
                          new Date().toISOString().split("T")[0]
                        }</span></span>
                        <span>附件：1 张</span>
                    </div>
                    
                    <table style="width:100%; border-collapse:collapse; border:1px solid #333; font-size:13px;">
                        <thead>
                            <tr style="background:#eee;">
                                <th style="border:1px solid #333; padding:5px;">摘要</th>
                                <th style="border:1px solid #333; padding:5px;">会计科目</th>
                                <th style="border:1px solid #333; padding:5px; width:80px;">借方</th>
                                <th style="border:1px solid #333; padding:5px; width:80px;">贷方</th>
                            </tr>
                        </thead>
                        <tbody id="preview-tbody">
                            <tr><td colspan="4" style="text-align:center; padding:20px; color:#ccc;">等待录入数据...</td></tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="border:1px solid #333; text-align:center; font-weight:bold;">合 计</td>
                                <td id="preview-total-debit" style="border:1px solid #333; text-align:right; font-weight:bold;">0.00</td>
                                <td id="preview-total-credit" style="border:1px solid #333; text-align:right; font-weight:bold;">0.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <div style="margin-top:15px; font-size:12px; color:#888; line-height:1.5;">
                    💡 <strong>系统提示：</strong><br>
                    1. 凭证类型已根据【结算账户】自动判断。<br>
                    2. 摘要已根据【业务场景 + 往来单位】自动拼接。<br>
                    3. 借贷方向已自动平衡。
                </div>
            </div>
        </div>

        <h3 style="margin-top:30px;">最近录入记录</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>凭证号</th><th>日期</th><th style="text-align: right;">金额</th><th>制单人</th><th>状态</th><th>操作</th>
                </tr>
            </thead>
            <tbody>${voucherRows}</tbody>
        </table>
    `;

    // 初始化预览
    setTimeout(window.updateSmartPreview, 100);
  }

  // =========================================================================
  // 38. 凭证查询/审核 (VoucherQueryPrint) - [修复版：会计审核权限]
  // =========================================================================
  else if (moduleCode === "VoucherQueryPrint") {
    const manualVouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    const dynamicRows = manualVouchers
      .map((v) => {
        let statusColor = "#27ae60";
        let actionBtns = "";

        // 1. 状态颜色判断
        if (v.status === "待审核") {
          statusColor = "#f39c12";
          actionBtns = `
                            <a href="javascript:void(0)" onclick="auditPass('${v.id}')" style="color:#27ae60; font-weight:bold;">审核</a> | 
                            <a href="javascript:void(0)" onclick="auditReject('${v.id}')" style="color:#e74c3c;">驳回</a>
                        `;
        } else if (v.status === "已审核" || v.status === "已记账") {
          statusColor = "#27ae60";
          actionBtns = `
                            <a href="javascript:void(0)" onclick="openVoucherDetail(this)" style="color:#3498db;">查看</a> | 
                            <a href="javascript:void(0)" onclick="handleRedDash(this, '${v.id}')" style="color:#f39c12;">红冲</a>
                        `;
        } else if (v.status === "已驳回") {
          statusColor = "#c0392b";
          actionBtns = `<span style="color:#999;">等待重提</span>`;
        } else if (v.status === "已冲销") {
          statusColor = "#999";
          actionBtns = `<span style="color:#ccc;">已作废</span>`;
        }

        // 2. ★★★ 核心修复：动态获取摘要 ★★★
        // 如果有分录行，取第一行的摘要；否则显示默认值
        const displaySummary =
          v.lines && v.lines.length > 0 ? v.lines[0].summary : "手动录入凭证";

        return `
                        <tr id="row-${v.id}">
                            <td><input type="checkbox" ${
                              v.status === "待审核" ? "" : "disabled"
                            }></td>
                            <td class="val-id">${v.id}</td>
                            <td class="val-date">${v.date}</td>
                            
                            <td class="val-summary">${displaySummary}</td>
                            
                            <td class="val-debit">${v.amount}</td>
                            <td class="val-credit">${v.amount}</td>
                            <td class="status-cell"><span style="color: ${statusColor}; font-weight: bold;">${
          v.status || "已记账"
        }</span></td>
                            <td>${actionBtns}</td>
                        </tr>
                    `;
      })
      .join("");

    // ... (HTML 其余部分，包括表头等，保持不变) ...
    contentHTML += `
                    <h3>凭证审核列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox"></th>
                                <th>凭证号</th>
                                <th>日期</th>
                                <th>摘要</th>
                                <th>借方总额</th>
                                <th>贷方总额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dynamicRows}
                            <tr>
                                <td><input type="checkbox"></td>
                                <td class="val-id">转2025111808</td>
                                <td class="val-date">2025-11-20</td>
                                <td class="val-summary">手动录入凭证</td>
                                <td class="val-debit">600.00</td>
                                <td class="val-credit">600.00</td>
                                <td class="status-cell"><span style="color: #f39c12; font-weight: bold;">待审核</span></td>
                                <td>
                                    <a href="javascript:void(0)" onclick="auditPass('记2025111808')" style="color:#27ae60; font-weight:bold;">审核</a> | 
                                    <a href="javascript:void(0)" onclick="auditReject('记2025111808')" style="color:#e74c3c;">驳回</a>
                                </td>
                            </tr>
                            <tr id="row-记2025110001">
                                <td><input type="checkbox" disabled></td>
                                <td class="val-id">转2025110001</td>
                                <td class="val-date">2025-11-20</td>
                                <td class="val-summary">支付办公用品款</td>
                                <td class="val-debit">500.00</td>
                                <td class="val-credit">500.00</td>
                                <td class="status-cell"><span style="color: #27ae60; font-weight: bold;">已记账</span></td>
                                <td>
                                    <a href="javascript:void(0)" onclick="openVoucherDetail(this)" style="color:#3498db;">查看</a> | 
                                    <a href="javascript:void(0)" onclick="handleRedDash(this, '记2025110001')" style="color:#f39c12;">红冲</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 22. 凭证详情页 (VoucherDetail) - [最终修复版：自动计算合计金额]
  // =========================================================================
  else if (moduleCode === "VoucherDetail") {
    // 1. 尝试获取传递的基础信息
    let v = g_currentVoucher || { id: "无数据" };

    // 自动回捞完整数据
    if (v.id) {
      const allVouchers = JSON.parse(
        sessionStorage.getItem("ManualVouchers") || "[]"
      );
      const fullData = allVouchers.find((item) => item.id === v.id);
      if (fullData) v = fullData;
    }

    // 数据兜底
    if (!v.lines) v.lines = [];

    // ★★★ 核心修复：现场重新计算合计金额 (不再依赖 v.debit) ★★★
    let calcDebit = 0;
    let calcCredit = 0;

    v.lines.forEach((line) => {
      // 兼容不同字段名并去逗号
      const dStr = (line.jf || line.debit || "0").toString().replace(/,/g, "");
      const cStr = (line.df || line.credit || "0").toString().replace(/,/g, "");

      calcDebit += parseFloat(dStr) || 0;
      calcCredit += parseFloat(cStr) || 0;
    });

    // 格式化为字符串 (保留2位小数)
    const totalDebitStr = calcDebit.toFixed(2);
    const totalCreditStr = calcCredit.toFixed(2);
    // ★★★ 修复结束 ★★★

    // 解析日期
    const dateVal = v.date || new Date().toISOString().slice(0, 10);
    const dateObj = new Date(dateVal);
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
// ============================================================
    // ★★★ 核心修复：根据凭证号首字判断大标题 ★★★
    // ============================================================
    let titleText = "记 账 凭 证"; // 默认兜底
    let wordText = "记";         // 默认字号

    // 获取凭证号的第一个字 (例如 "收2025..." -> "收")
    const firstChar = v.id ? v.id.charAt(0) : "记";
    
    if (firstChar === '收') {
        titleText = "收 款 凭 证";
        wordText = "收";
    } else if (firstChar === '付') {
        titleText = "付 款 凭 证";
        wordText = "付";
    } else if (firstChar === '转') {
        titleText = "转 账 凭 证";
        wordText = "转";
    }

    // 凭证字 (右上角显示用)
    const voucherWord = firstChar;
    // 样式保持不变
    const voucherStyle = `
                    <style>
                        .voucher-box {
                            font-family: "SimSun", "Songti SC", serif;
                            color: #333;
                            width: 1000px;
                            margin: 0 auto;
                            padding: 30px;
                            background: #fff;
                            position: relative;
                            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                            border: 1px solid #ddd;
                        }
                        .v-title-container { text-align: center; margin-bottom: 10px; position: relative; }
                        .v-title {
                            font-size: 36px; font-weight: bold; letter-spacing: 15px;
                            display: inline-block; border-bottom: 3px double #333;
                            padding-bottom: 5px; margin-bottom: 5px; text-shadow: 0.5px 0 0 #333;
                        }
                        .v-header-info {
                            display: flex; justify-content: space-between; align-items: flex-end;
                            margin-bottom: 5px; font-size: 15px; padding: 0 5px;
                        }
                        .v-date-group span {
                            display: inline-block; border-bottom: 1px solid #333;
                            width: 50px; text-align: center; margin: 0 2px; font-family: Arial;
                        }
                        .v-table { width: 100%; border-collapse: collapse; border: 2px solid #333; }
                        .v-table th, .v-table td {
                            border: 1px solid #333; height: 40px; vertical-align: middle; font-size: 15px;
                        }
                        .v-table th { text-align: center; font-weight: bold; padding: 5px; }
                        
                        /* 金额网格背景 */
                        .money-grid-bg {
                            background-image: linear-gradient(to right, transparent 95%, #ddd 95%);
                            background-size: 9.09% 100%; 
                            font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold;
                            letter-spacing: 6px; text-align: right; padding-right: 3px; overflow: hidden;
                        }
                        .money-header-row div {
                            display: flex; justify-content: space-between; padding: 0 2px;
                            color: #666; font-weight: normal; transform: scale(0.95); font-size: 12px;
                        }
                        .money-header-row span { flex: 1; text-align: center; border-right: 1px solid #eee; }
                        .money-header-row span:last-child { border: 0; }
                        .v-footer {
                            margin-top: 15px; display: flex; justify-content: space-between; font-size: 14px; padding: 0 10px;
                        }
                        .v-footer span {
                            display: inline-block; width: 70px; border-bottom: 1px solid #333; height: 20px; text-align: center;
                        }
                        .attachment-side { position: absolute; right: -25px; top: 110px; width: 20px; font-size: 13px; line-height: 1.2; text-align: center; }
                    </style>
                `;

    // 动态生成分录行
    let linesHTML = "";
    const minRows = 5;
    const loopCount = Math.max(v.lines.length, minRows);

    for (let i = 0; i < loopCount; i++) {
      const line = v.lines[i] || {};

      const summary = line.summary || line.zy || "";
      const accountStr = line.account || line.km || "";
      let debit = line.debit || line.jf || "";
      let credit = line.credit || line.df || "";

      let subjectCode = "";
      let subjectName = accountStr;

      const match = accountStr.match(/^(\d+)\s+(.*)/);
      if (match) {
        subjectCode = match[1];
        subjectName = match[2];
      } else if (/^\d+$/.test(accountStr)) {
        subjectCode = accountStr;
        subjectName = "";
      }

      const debitVal = debit ? debit.toString().replace(/,/g, "") : "";
      const creditVal = credit ? credit.toString().replace(/,/g, "") : "";
      const rowColor = v.isRed ? "color: red;" : "";

      linesHTML += `
                        <tr style="${rowColor}">
                            <td style="padding:0 8px;">${summary}</td>
                            <td style="padding:0 8px;">${subjectName}</td>
                            <td style="padding:0 8px; text-align:center;">${subjectCode}</td>
                            <td style="text-align:center;">${
                              summary ? "√" : ""
                            }</td>
                            <td class="money-grid-bg">${debitVal}</td>
                            <td class="money-grid-bg">${creditVal}</td>
                        </tr>
                    `;
    }

 contentHTML += `
        ${voucherStyle}
        
        <div style="margin-bottom:20px; display:flex; justify-content:space-between;">
            <button class="btn-primary" style="background-color: #95a5a6;" onclick="loadContent('VoucherQueryPrint')"> < 返回列表</button>
            <div>
                <button class="btn-primary" style="background-color: #3498db;" onclick="window.print()">🖨 打印凭证</button>
            </div>
        </div>

        <div class="voucher-box">
            <div class="v-title-container">
                <div class="v-title">${titleText}</div>
                
                <div style="position:absolute; right:10px; top:10px; font-size:14px;">${wordText}字第 ${v.id.replace(/\D/g, "")} 号</div>
            </div>

            <div class="v-header-info">
                <div style="visibility:hidden;">占位</div>
                <div class="v-date-group">
                    <span>${y}</span>年<span>${m}</span>月<span>${d}</span>日
                </div>
                <div style="visibility:hidden;">占位</div>
            </div>

            <table class="v-table">
                <thead>
                    <tr>
                        <th rowspan="2" style="width: 22%;">摘 要</th>
                        <th rowspan="2" style="width: 18%;">总账科目</th>
                        <th rowspan="2" style="width: 15%;">明细科目</th>
                        <th rowspan="2" style="width: 30px;">√</th>
                        <th style="width: 20%;">借 方 金 额</th>
                        <th style="width: 20%;">贷 方 金 额</th>
                    </tr>
                    <tr class="money-header-row">
                        <th style="padding:0;">
                            <div style="border:none;">
                                <span>千</span><span>百</span><span>十</span><span>万</span><span>千</span><span>百</span><span>十</span><span>元</span><span>角</span><span>分</span>
                            </div>
                        </th>
                        <th style="padding:0;">
                            <div style="border:none;">
                                <span>千</span><span>百</span><span>十</span><span>万</span><span>千</span><span>百</span><span>十</span><span>元</span><span>角</span><span>分</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${linesHTML}
                    <tr style="${v.isRed ? "color:red;" : ""}">
                        <td colspan="3" style="text-align: left; padding-left: 20px; font-weight: bold;">合　　计</td>
                        <td></td>
                        <td class="money-grid-bg">
                            <span style="float:left; font-size:12px; margin-top:3px; margin-left:5px;">¥</span>
                            ${totalDebitStr}
                        </td>
                        <td class="money-grid-bg">
                            <span style="float:left; font-size:12px; margin-top:3px; margin-left:5px;">¥</span>
                            ${totalCreditStr}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="attachment-side">附<br>单<br>据<br><br><strong>1</strong><br><br>张</div>

            <div class="v-footer">
                <div>财务主管：<span>___________</span></div>
                <div>记账：<span>${v.status === "已记账" ? "系统" : ""}</span></div>
                <div>出纳：<span>___________</span></div>
                <div>审核：<span>张三</span></div>
                <div>制单：<span>${v.user || "系统引擎"}</span></div>
            </div>
        </div>
    `;
  }


  // =========================================================================
  // 57. 权限管理 (Permission) - [RBAC模型 + 数据范围控制]
  // =========================================================================
  else if (moduleCode === "Permission") {
    // 1. 初始化角色数据 (支持缓存)
    // 预设了三个经典财务角色：CFO、会计、出纳
    let roleData = JSON.parse(sessionStorage.getItem('RoleConfig'));
    if (!roleData) {
      roleData = [
        { 
            id: 'role_cfo', 
            name: '财务总监 (CFO)', 
            desc: '全公司数据可见，拥有一级审批权', 
            scope: 'all', // all=全公司, dept=本部门, self=仅本人
            perms: ['dashboard', 'report', 'audit', 'approval', 'setup'] 
        },
        { 
            id: 'role_acct', 
            name: '总账会计', 
            desc: '负责凭证录入、结账与报表出具', 
            scope: 'dept', 
            perms: ['voucher', 'ledger', 'settlement', 'asset', 'invoice'] 
        },
        { 
            id: 'role_cashier', 
            name: '出纳专员', 
            desc: '负责资金收付，严禁接触总账与审核', 
            scope: 'self', 
            perms: ['treasury', 'bank', 'expense'] 
        }
      ];
      sessionStorage.setItem('RoleConfig', JSON.stringify(roleData));
    }

    // 2. 获取当前选中的角色 (默认第一个)
    const currentRoleId = window.g_currentRoleSelect || 'role_cfo';
    const currentRole = roleData.find(r => r.id === currentRoleId) || roleData[0];

    // 3. 生成左侧角色列表 HTML
    const roleListHtml = roleData.map(r => {
        const isActive = r.id === currentRoleId ? 'background:#e6f7ff; border-right:3px solid #1890ff;' : '';
        return `
            <div onclick="switchRole('${r.id}')" style="padding:15px; cursor:pointer; border-bottom:1px solid #eee; transition:all 0.2s; ${isActive}">
                <div style="font-weight:bold; color:#333;">${r.name}</div>
                <div style="font-size:12px; color:#999; margin-top:4px;">${r.desc}</div>
            </div>
        `;
    }).join('');

    // 4. 辅助函数：检查权限是否被选中
    const isChecked = (code) => currentRole.perms.includes(code) ? 'checked' : '';

    contentHTML += `
        <h2>角色与权限管理 (RBAC) 🛡️</h2>
        <p style="color: #7f8c8d;">
            配置系统角色的功能访问权与数据可见性。系统内置 <b>不相容职责互斥(SoD)</b> 检查。
        </p>

        <div style="display:flex; height: 650px; border:1px solid #ddd; border-radius:8px; overflow:hidden; background:white;">
            
            <div style="width: 280px; background:#f9f9f9; border-right:1px solid #ddd; display:flex; flex-direction:column;">
                <div style="padding:15px; border-bottom:1px solid #ddd; background:#fff;">
                    <button class="btn-primary" style="width:100%;" onclick="alert('新增角色功能待开发')">+ 新增角色</button>
                </div>
                <div style="flex:1; overflow-y:auto;">
                    ${roleListHtml}
                </div>
            </div>

            <div style="flex:1; padding:25px; overflow-y:auto;">
                
                <div style="border-bottom:1px solid #eee; padding-bottom:20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h3 style="margin:0; color:#2c3e50;">正在配置：<span style="color:#2980b9;">${currentRole.name}</span></h3>
                        <p style="margin:5px 0 0 0; color:#7f8c8d; font-size:13px;">角色ID: ${currentRole.id}</p>
                    </div>
                    <div>
                        <button class="btn-primary" style="background:#e74c3c;" onclick="deleteRole()">删除角色</button>
                    </div>
                </div>

                <div style="background:#fffbe6; border:1px solid #ffe58f; padding:15px; border-radius:6px; margin-bottom:25px;">
                    <label style="font-weight:bold; display:block; margin-bottom:10px;">👁️ 数据可见范围 (Data Scope)</label>
                    <select id="scope-select" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        <option value="all" ${currentRole.scope === 'all' ? 'selected' : ''}>🏢 全公司数据 (适合老板/CFO/审计)</option>
                        <option value="dept" ${currentRole.scope === 'dept' ? 'selected' : ''}>📂 仅本部门数据 (适合部门经理)</option>
                        <option value="self" ${currentRole.scope === 'self' ? 'selected' : ''}>👤 仅本人数据 (适合普通员工)</option>
                    </select>
                    <div style="font-size:12px; color:#d48806; margin-top:5px;">* 修改此选项将影响该角色用户在报表和列表中看到的数据量。</div>
                </div>

                <h4 style="border-left:4px solid #3498db; padding-left:10px; margin-bottom:15px;">功能模块授权</h4>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    
                    <div class="perm-card" style="border:1px solid #eee; padding:15px; border-radius:6px;">
                        <label style="font-weight:bold; display:block; margin-bottom:10px; color:#2c3e50;">
                            <input type="checkbox" disabled checked> 📖 账务核算
                        </label>
                        <div style="margin-left:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                            <label><input type="checkbox" class="perm-chk" value="voucher" ${isChecked('voucher')}> 凭证录入</label>
                            <label><input type="checkbox" class="perm-chk" value="audit" ${isChecked('audit')}> 凭证审核 <span style="color:red;font-size:10px">(互斥)</span></label>
                            <label><input type="checkbox" class="perm-chk" value="ledger" ${isChecked('ledger')}> 账簿查询</label>
                            <label><input type="checkbox" class="perm-chk" value="settlement" ${isChecked('settlement')}> 业务结算</label>
                        </div>
                    </div>

                    <div class="perm-card" style="border:1px solid #eee; padding:15px; border-radius:6px;">
                        <label style="font-weight:bold; display:block; margin-bottom:10px; color:#2c3e50;">
                            <input type="checkbox" disabled checked> 💰 资金与收付
                        </label>
                        <div style="margin-left:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                            <label><input type="checkbox" class="perm-chk" value="treasury" ${isChecked('treasury')}> 收付款执行</label>
                            <label><input type="checkbox" class="perm-chk" value="bank" ${isChecked('bank')}> 银企直联/对账</label>
                            <label><input type="checkbox" class="perm-chk" value="expense" ${isChecked('expense')}> 费用报销</label>
                            <label><input type="checkbox" class="perm-chk" value="approval" ${isChecked('approval')}> 资金审批</label>
                        </div>
                    </div>

                    <div class="perm-card" style="border:1px solid #eee; padding:15px; border-radius:6px;">
                        <label style="font-weight:bold; display:block; margin-bottom:10px; color:#2c3e50;">
                            <input type="checkbox" disabled checked> 🧾 税务管理
                        </label>
                        <div style="margin-left:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                            <label><input type="checkbox" class="perm-chk" value="invoice" ${isChecked('invoice')}> 销项/进项发票</label>
                            <label><input type="checkbox" class="perm-chk" value="tax" ${isChecked('tax')}> 纳税申报表</label>
                        </div>
                    </div>

                    <div class="perm-card" style="border:1px solid #eee; padding:15px; border-radius:6px;">
                        <label style="font-weight:bold; display:block; margin-bottom:10px; color:#2c3e50;">
                            <input type="checkbox" disabled checked> 📊 报表与系统
                        </label>
                        <div style="margin-left:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                            <label><input type="checkbox" class="perm-chk" value="dashboard" ${isChecked('dashboard')}> 经营仪表盘</label>
                            <label><input type="checkbox" class="perm-chk" value="report" ${isChecked('report')}> 三大财务报表</label>
                            
                            <label><input type="checkbox" class="perm-chk" value="log" ${isChecked('log')}> 操作日志</label>
                        </div>
                    </div>

                </div>

                <div style="margin-top:30px; border-top:1px solid #eee; padding-top:20px; text-align:right;">
                    <button class="btn-primary" style="background:#95a5a6; margin-right:10px;" onclick="loadContent('Permission')">重置</button>
                    <button class="btn-primary" style="background:#27ae60; padding:10px 30px;" onclick="saveRoleConfig('${currentRole.id}')">💾 保存配置</button>
                </div>

            </div>
        </div>
    `;
  }

  // =========================================================================
  // 39. 科目汇总表 (AcctSubjectSummary) - [终极修复版：精准汇总]
  // =========================================================================
  else if (moduleCode === "AcctSubjectSummary") {
    const includeUnchecked = false; // 默认不含未审核
    const vouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    // 1. 定义基础科目字典
    // 关键技巧：把中文名称也做成映射，防止录入时只写中文匹配不到
    let summaryMap = {
      1001: {
        code: "1001",
        name: "库存现金",
        start: 5000.0,
        debit: 0,
        credit: 0,
        dir: "借",
      },
      1002: {
        code: "1002",
        name: "银行存款",
        start: 800000.0,
        debit: 0,
        credit: 0,
        dir: "借",
      },
      1122: {
        code: "1122",
        name: "应收账款",
        start: 150000.0,
        debit: 0,
        credit: 0,
        dir: "借",
      },
      2202: {
        code: "2202",
        name: "应付账款",
        start: 60000.0,
        debit: 0,
        credit: 0,
        dir: "贷",
      },
      6001: {
        code: "6001",
        name: "主营业务收入",
        start: 0.0,
        debit: 0,
        credit: 0,
        dir: "贷",
      },
      6602: {
        code: "6602",
        name: "管理费用",
        start: 0.0,
        debit: 0,
        credit: 0,
        dir: "借",
      },
      6401: {
        code: "6401",
        name: "主营业务成本",
        start: 0.0,
        debit: 0,
        credit: 0,
        dir: "借",
      },
      4103: {
        code: "4103",
        name: "本年利润",
        start: 0.0,
        debit: 0,
        credit: 0,
        dir: "贷",
      },
    };

    // 2. 遍历凭证
    vouchers.forEach((v) => {
      let isValid = false;
      if (v.status === "已审核" || v.status === "已记账") isValid = true;
      if (includeUnchecked && (v.status === "待审核" || v.status === "草稿"))
        isValid = true;
      if (v.status === "已驳回" || v.status === "已冲销") isValid = false;

      if (isValid && v.lines) {
        v.lines.forEach((line) => {
          const acctInput = line.account ? line.account.trim() : "未录入";
          const debitVal = parseFloat(line.debit) || 0;
          const creditVal = parseFloat(line.credit) || 0;

          // ★★★ 智能匹配逻辑 ★★★
          let targetKey = null;

          // A. 先试着找代码 (比如 "6001")
          const codeMatch = acctInput.match(/^\d+/);
          if (codeMatch && summaryMap[codeMatch[0]]) {
            targetKey = codeMatch[0];
          }
          // B. 如果没代码，试着找中文名称 (比如 "主营业务收入")
          else {
            targetKey = Object.keys(summaryMap).find(
              (k) =>
                summaryMap[k].name === acctInput ||
                acctInput.includes(summaryMap[k].name)
            );
          }

          if (targetKey) {
            // 找到了预设科目 -> 累加
            summaryMap[targetKey].debit += debitVal;
            summaryMap[targetKey].credit += creditVal;
          } else {
            // 没找到 -> 动态新增一行 (用输入内容做 key)
            if (!summaryMap[acctInput]) {
              summaryMap[acctInput] = {
                code: acctInput,
                name: "(自录入)",
                start: 0,
                debit: 0,
                credit: 0,
                dir: "借",
              };
            }
            summaryMap[acctInput].debit += debitVal;
            summaryMap[acctInput].credit += creditVal;
          }
        });
      }
    });

    // 3. 生成 HTML
    let rowsHTML = "";
    let totalDebit = 0,
      totalCredit = 0;

    // 按科目代码排序
    const sortedKeys = Object.keys(summaryMap).sort();

    sortedKeys.forEach((key) => {
      const data = summaryMap[key];

      // 计算期末
      let endBalance = 0;
      if (data.dir === "借") {
        endBalance = data.start + data.debit - data.credit;
      } else {
        endBalance = data.start + data.credit - data.debit;
      }

      totalDebit += data.debit;
      totalCredit += data.credit;

      // ★★★ 只要有余额 OR 有发生额，就显示！★★★
      // 哪怕余额是0，只要本期发生过（debit/credit不为0），也要显示出来
      if (data.start !== 0 || data.debit !== 0 || data.credit !== 0) {
        rowsHTML += `
                            <tr>
                                <td>${data.code}</td>
                                <td>${data.name}</td>
                                <td>${data.dir}</td>
                                <td style="text-align:right; color:#999;">${data.start.toLocaleString(
                                  "en-US",
                                  { minimumFractionDigits: 2 }
                                )}</td>
                                <td style="text-align:right; font-weight:bold; color:${
                                  data.debit > 0 ? "#2980b9" : "#333"
                                }">${data.debit.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}</td>
                                <td style="text-align:right; font-weight:bold; color:${
                                  data.credit > 0 ? "#2980b9" : "#333"
                                }">${data.credit.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}</td>
                                <td style="text-align:right; color:#27ae60; font-weight:bold;">${endBalance.toLocaleString(
                                  "en-US",
                                  { minimumFractionDigits: 2 }
                                )}</td>
                                <td><a href="javascript:void(0)" onclick="openSubjectDetail('${
                                  data.code
                                }', '${
          data.name
        }')" style="color:#3498db;">联查明细</a></td>
                            </tr>
                        `;
      }
    });

    contentHTML += `
                    <h2>科目汇总表</h2>
                    <p style="color: #7f8c8d;">实时汇总当前会计期间各科目的发生额及余额。</p>
                    <div class="filter-area" style="background:white;padding:15px;margin-bottom:20px;">
                        <button class="btn-primary" onclick="loadContent('AcctSubjectSummary')">刷新数据</button>
                    </div>
                    <h3>2025年11期 汇总数据</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>科目编码</th><th>科目名称</th><th>方向</th>
                                <th style="text-align:right;">期初余额</th>
                                <th style="text-align:right;background:#eef2f3;">借方发生</th>
                                <th style="text-align:right;background:#eef2f3;">贷方发生</th>
                                <th style="text-align:right;">期末余额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHTML}</tbody>
                        <tfoot>
                            <tr style="font-weight:bold;background:#f0f0f0;">
                                <td colspan="4" style="text-align:center;">合 计</td>
                                <td style="text-align:right;color:#e74c3c;">${totalDebit.toLocaleString(
                                  "en-US",
                                  { minimumFractionDigits: 2 }
                                )}</td>
                                <td style="text-align:right;color:#e74c3c;">${totalCredit.toLocaleString(
                                  "en-US",
                                  { minimumFractionDigits: 2 }
                                )}</td>
                                <td colspan="2"></td>
                            </tr>
                        </tfoot>
                    </table>
                `;
  }

  // =========================================================================
  // 40. 业务单据映射配置 (EngineMapping) - [功能增强版：支持增改停]
  // =========================================================================
  else if (moduleCode === "EngineMapping") {
    // 1. 初始化默认数据 (如果 Session 为空)
    let mappings = JSON.parse(sessionStorage.getItem("EngineMappings"));
    if (!mappings) {
      mappings = [
        {
          id: "MAP_CST_REV_AIR",
          name: "陆运出口收入确认",
          type: "客户结算单",
          condition: "业务线=陆运且状态=已确认",
          template: "TPL_REV_AIR",
          status: "禁用",
        },
        {
          id: "MAP_AP_PAYMENT",
          name: "供应商运费应付",
          type: "供应商对账单",
          condition: "状态=已审批",
          template: "TPL_COST_TRUNK",
          status: "禁用",
        },
      ];
      sessionStorage.setItem("EngineMappings", JSON.stringify(mappings));
    }

    // 2. 生成表格行 (新增了删除按钮)
    const rowsHTML = mappings
      .map((item) => {
        const statusColor = item.status === "启用" ? "#27ae60" : "#c0392b";
        const toggleAction = item.status === "启用" ? "禁用" : "启用";
        const toggleColor = item.status === "启用" ? "#e74c3c" : "#27ae60";

        return `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.type}</td>
                            <td>${item.condition}</td>
                            <td>${item.template}</td>
                            <td><span style="color: ${statusColor}; font-weight: bold;">${item.status}</span></td>
                            <td>
                                <a href="javascript:void(0)" onclick="editMapping('${item.id}')" style="color:#3498db;">编辑</a> | 
                                <a href="javascript:void(0)" onclick="toggleMappingStatus('${item.id}')" style="color:${toggleColor};">${toggleAction}</a> |
                                <a href="javascript:void(0)" onclick="deleteMapping(this, '${item.id}')" style="color:#c0392b;">删除</a>
                            </td>
                        </tr>
                    `;
      })
      .join("");

    contentHTML += `
                    <h2>业务单据映射配置 🔗</h2>
                    <p style="color: #7f8c8d;">定义和管理业务系统单据与会计凭证的转换规则，是业财一体化的核心。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">源单据类型 (全部)</option>
                                <option>客户结算单</option>
                                <option>供应商对账单</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;" onclick="addMapping()">+ 新增映射配置</button>
                        <button class="btn-primary" style="background-color: #f39c12;" onclick="testMapping()">模拟测试</button>
                    </div>

                    <h3>映射配置列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>配置ID</th>
                                <th>配置名称</th>
                                <th>源单据类型</th>
                                <th>触发条件</th>
                                <th>关联模板</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                    <p style="margin-top:10px; color:#999; font-size:12px;">* 提示：禁用配置后，对应的业务单据将无法自动生成凭证。</p>
                `;
  }

  // =========================================================================
  // 41. 自动分录模板 (EngineTemplate) - [功能增强版：支持配置]
  // =========================================================================
  else if (moduleCode === "EngineTemplate") {
    // 1. 读取模板数据
    let templates = JSON.parse(
      sessionStorage.getItem("AutoVoucherTemplates") || "[]"
    );

    // 如果为空，初始化一个默认模板用于演示
    if (templates.length === 0) {
      const templates = [
        // 1. 模板 A：收入确认 (业务确认债权时触发)
        {
          id: "TPL_REV_CONFIRM",
          name: "收入确认标准模板",
          voucherWord: "记", // 配置为“记字号”
          trigger: "对账单确认", // 触发条件
          matchRule: { bizType: "通用", customerType: "月结" },
          entries: [
            // 借：应收账款 (总额)
            { dir: "借", subject: "1122 应收账款", amountType: "价税合计" },
            // 贷：主营业务收入 (净额)
            {
              dir: "贷",
              subject: "6001 主营业务收入",
              amountType: "不含税金额",
            },
            // 贷：待转销项税 (因为还没开票，先记在待转里)
            {
              dir: "贷",
              subject: "2221 应交税费-待转销项税额",
              amountType: "税额",
            },
          ],
          status: "启用",
        },

        // 2. 模板 B：开票税务 (财务正式开票时触发)
        {
          id: "TPL_TAX_INVOICE",
          name: "开票税金结转模板",
          voucherWord: "转", // 配置为“转字号”
          trigger: "发票开具", // 触发条件
          matchRule: { bizType: "销项发票" },
          entries: [
            // 借：待转销项税 (把之前挂账的待转税冲掉)
            {
              dir: "借",
              subject: "2221 应交税费-待转销项税额",
              amountType: "税额",
            },
            // 贷：应交增值税 (确认纳税义务)
            {
              dir: "贷",
              subject: "2221 应交税费-应交增值税(销项)",
              amountType: "税额",
            },
          ],
          status: "启用",
        },

        // 3. 模板 C：收款核销 (银行收到钱并核销时触发)
        {
          id: "TPL_AR_VERIFY",
          name: "收款核销标准模板",
          voucherWord: "银", // 配置为“银字号”
          trigger: "收款核销", // 触发条件
          matchRule: { bizType: "收款" },
          entries: [
            // 借：银行存款 (钱进来了)
            { dir: "借", subject: "1002 银行存款", amountType: "核销金额" },
            // 贷：应收账款 (债权消灭)
            { dir: "贷", subject: "1122 应收账款", amountType: "核销金额" },
          ],
          status: "启用",
        },
      ];
      sessionStorage.setItem("AutoVoucherTemplates", JSON.stringify(templates));
    }

    // 2. 生成列表 HTML
    const rowsHTML = templates
      .map(
        (t) => `
                    <tr>
                        <td>${t.id}</td>
                        <td><strong>${t.name}</strong></td>
                        <td>业务线:${t.matchRule.bizType} | 发票:${
          t.matchRule.invoiceType
        }</td>
                        <td>${t.entries.length} 行分录</td>
                        <td><span style="color:${
                          t.status === "启用" ? "#27ae60" : "#ccc"
                        }">${t.status}</span></td>
                        <td>
                            <a href="javascript:void(0)" onclick="deleteTemplate('${
                              t.id
                            }')" style="color:#e74c3c;">删除</a>
                        </td>
                    </tr>
                `
      )
      .join("");

    contentHTML += `
                    <h2>自动分录模板 📋</h2>
                    <p style="color: #7f8c8d;">定义发票开具后自动生成凭证的规则。</p>
                    
                    <div id="tpl-list-view">
                        <div class="action-bar" style="margin-bottom: 15px;">
                            <button class="btn-primary" style="background-color: #27ae60;" onclick="showTemplateForm()">+ 新增分录模板</button>
                        </div>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>模板编码</th><th>模板名称</th><th>适用条件 (触发规则)</th><th>分录行数</th><th>状态</th><th>操作</th>
                                </tr>
                            </thead>
                            <tbody>${rowsHTML}</tbody>
                        </table>
                    </div>

                    <div id="tpl-edit-view" style="display:none; background:#fff; padding:20px; border-radius:8px; border:1px solid #ddd;">
                        <h3 style="margin-top:0;">新增/编辑模板</h3>
                        <div style="display:flex; gap:15px; margin-bottom:15px;">
                            <input type="text" id="tpl-name" placeholder="模板名称 (如: 陆运运收入模板)" style="padding:8px; width:200px; border:1px solid #ccc;">
                            <select id="tpl-bizType" style="padding:8px; border:1px solid #ccc;">
                                <option value="通用">通用业务</option>
                                <option value="陆运">陆运</option>
                                <option value="空运">空运</option>
                                <option value="海运">海运</option>
                            </select>
                            <select id="tpl-invType" style="padding:8px; border:1px solid #ccc;">
                                <option value="专用发票">增值税专用发票</option>
                                <option value="普通发票">普通发票</option>
                            </select>
                        </div>
                        
                        <div style="background:#f9f9f9; padding:10px; border-left:4px solid #3498db; margin-bottom:15px;">
                            <strong>分录规则配置：</strong>
                            <ul style="font-size:13px; color:#666; margin:5px 0 0 20px;">
                                <li>行1 (借)：1122 应收账款 (金额 = 价税合计)</li>
                                <li>行2 (贷)：6001 主营业务收入 (金额 = 不含税金额)</li>
                                <li>行3 (贷)：2221 应交税费-销项 (金额 = 税额)</li>
                            </ul>
                            <p style="font-size:12px; color:#999;">(为简化原型，此处使用固定逻辑，实际开发需支持动态增减行)</p>
                        </div>

                        <div style="text-align:right;">
                            <button class="btn-primary" style="background-color:#95a5a6;" onclick="hideTemplateForm()">取消</button>
                            <button class="btn-primary" onclick="saveTemplate()">保存配置</button>
                        </div>
                    </div>
                `;
  }

  // =========================================================================
  // 42. 凭证生成日志 (EngineLog)
  // =========================================================================
  else if (moduleCode === "EngineLog") {
    contentHTML += `
                    <h2>凭证生成日志 📜</h2>
                    <p style="color: #7f8c8d;">提供自动生成凭证过程的审计追踪。记录每次单据转换的结果和错误信息。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="date" placeholder="起始日期" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">生成状态 (全部)</option>
                                <option>成功</option>
                                <option>失败</option>
                                <option>部分成功</option>
                            </select>
                            <input type="text" placeholder="源单据号 / 凭证号" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>

                    <h3>自动分录日志记录</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>时间戳</th>
                                <th>源单据类型/号</th>
                                <th>生成凭证号</th>
                                <th>金额 (RMB)</th>
                                <th>状态</th>
                                <th>操作人/系统</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-11-20 20:58:30</td>
                                <td>结算单 CS008976</td>
                                <td>自2025110015</td>
                                <td>15,000.00</td>
                                <td><span style="color: #27ae60; font-weight: bold;">成功</span></td>
                                <td>System Batch</td>
                                <td><a href="#" style="color:#3498db;">查看凭证</a> | <a href="#" style="color:#27ae60;">重试</a></td>
                            </tr>
                            <tr>
                                <td>2025-11-20 20:59:15</td>
                                <td>报销单 BX201005</td>
                                <td>-</td>
                                <td>800.00</td>
                                <td><span style="color: #e74c3c; font-weight: bold;">失败</span></td>
                                <td>User_LiLei</td>
                                <td><a href="#" style="color:#e74c3c;">查看错误详情</a> | <a href="#" style="color:#3498db;">修改并重试</a></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 43. 结转损益 (PeriodEndProfit) - [逻辑修复版：默认未结转 + 真实计算]
  // =========================================================================
  else if (moduleCode === "PeriodEndProfit") {
    // 1. 读取状态 (默认为 false/未结转)
    const isTransferred =
      sessionStorage.getItem("2025-11-ProfitTransferred") === "true";

    // 2. 读取已保存的结转金额 (如果没有，说明还没算过)
    const savedAmount = sessionStorage.getItem("2025-11-ProfitAmount");

    // 3. 设置显示变量
    const statusText = isTransferred ? "已结转" : "未结转";
    const statusColor = isTransferred ? "#27ae60" : "#c0392b";

    // 关键：如果已结转，显示金额；否则显示“待执行”
    const amountText = isTransferred
      ? `<span style="color: #2980b9; font-weight:bold;">${savedAmount}</span>`
      : '<span style="color: #f39c12;">待执行 (系统自动计算)</span>';

    const timeText = isTransferred ? new Date().toLocaleString() : "-";
    const voucherText = isTransferred ? "结202511001" : "-";

    // 4. 操作按钮逻辑
    const actionHtml = isTransferred
      ? `<a href="javascript:void(0)" onclick="reverseTransfer('2025年11期')" style="color:#e74c3c;">冲回</a> | <a href="javascript:void(0)" onclick="viewPLVoucher('结202511001')" style="color:#3498db;">查看凭证</a>`
      : `<button onclick="executeTransfer('2025年11期')" class="btn-primary" style="padding:4px 8px; font-size:12px;">执行结转</button>`;

    contentHTML += `
                    <h2>结转损益 🔄</h2>
                    <p style="color: #7f8c8d;">执行期末自动操作，将所有损益类科目余额结转到本年利润。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                         <button class="btn-primary" onclick="loadContent('PeriodEndProfit')">刷新状态</button>
                    </div>

                    <h3>结转历史记录</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>期间</th>
                                <th>操作时间</th>
                                <th>损益净额 (RMB)</th>
                                <th>结转凭证号</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="row-2025-11" style="${
                              isTransferred ? "background:#f0fdf4" : ""
                            }">
                                <td>2025年11期</td>
                                <td class="time-cell">${timeText}</td>
                                <td class="amount-cell">${amountText}</td>
                                <td class="voucher-cell">${voucherText}</td>
                                <td class="status-cell"><span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></td>
                                <td class="action-cell">${actionHtml}</td>
                            </tr>
                            <tr>
                                <td>2025年10期</td>
                                <td>2025-11-01 10:15</td>
                                <td>+50,000.00</td>
                                <td>结202510001</td>
                                <td><span style="color: #27ae60; font-weight: bold;">已结转</span></td>
                                <td><span style="color:#ccc">历史数据</span></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 44. 月末结账 (PeriodEndClose) - [修复版：反结账逻辑闭环]
  // =========================================================================
  else if (moduleCode === "PeriodEndClose") {
    // 1. 读取结账状态
    const isClosed = sessionStorage.getItem("2025-11-MonthClosed") === "true";

    if (isClosed) {
      // --- 场景 A：已结账状态 (显示反结账) ---
      contentHTML += `
                        <h2>月末结账/锁定  🔒</h2>
                        
                        <div style="background: #e8f5e9; padding: 40px; text-align: center; border: 1px solid #27ae60; border-radius: 8px; margin-top: 20px;">
                            <h1 style="color: #27ae60; margin: 0;">✅ 2025年11期 已结账</h1>
                            <p style="color: #666; margin-top: 10px;">当前会计期间已切换至 <strong>2025年12期</strong>。</p>
                            <p style="color: #666;">历史数据已锁定，禁止录入、修改或删除凭证。</p>
                            
                            <div style="margin-top: 30px;">
                                <button class="btn-primary" style="background-color: #e74c3c; padding: 10px 30px; font-size: 16px;" onclick="executeReOpen()">⏪ 申请反结账 (回退)</button>
                            </div>
                            <p style="font-size:12px; color:#999; margin-top:10px;">* 反结账操作将记录高危审计日志</p>
                        </div>
                    `;
    } else {
      // --- 场景 B：未结账状态 (显示检查表) ---
      contentHTML += `
                        <h2>月末结账/锁定  🔒</h2>
                        <p style="color: #7f8c8d;">执行期末结账，锁定当期数据。结账前需通过所有系统检查。</p>
                        
                        <div class="filter-area" style="background-color: white; padding: 15px; margin-bottom: 20px;">
                            <span style="font-weight:bold;">当前会计期间：<span style="color:#2980b9; font-size:18px;">2025年11期</span></span>
                            <button class="btn-primary" onclick="refreshClosingCheck()" style="margin-left:15px;">🔄 刷新检查状态</button>
                        </div>
                        
                        <div class="action-bar" style="margin-bottom: 15px;">
                            <button id="btnExecuteClose" class="btn-primary" style="background-color: #95a5a6; cursor: not-allowed;" onclick="executeMonthEndClose()" disabled>执行月末结账</button>
                        </div>

                        <h3>结账前检查清单</h3>
                        <table class="data-table">
                            <thead><tr><th>检查项</th><th>状态</th><th>提示信息</th><th>操作</th></tr></thead>
                            <tbody id="checkListBody">
                                <tr><td colspan="4" style="text-align:center; color:#999;">请点击“刷新检查状态”开始自检...</td></tr>
                            </tbody>
                        </table>
                    `;

      // 自动触发一次检查
      setTimeout(refreshClosingCheck, 200);
    }
  }

  // =========================================================================
  // 45. 资产负债表 (ReportBalanceSheet) - [清空版：纯净数据]
  // =========================================================================
  else if (moduleCode === "ReportBalanceSheet") {
    // 1. 获取本年利润 (这是让报表平衡的关键！)
    // 利润表算出的“净利润”，最终会变成资产负债表里的“权益”
    const profitResult =
      typeof calculateRealProfit === "function"
        ? calculateRealProfit()
        : { profit: 0 };
    const currentProfit = profitResult.profit;

    // 2. 初始化报表结构
    // 我们把期初余额全部设为 0，只保留科目壳子，这样数据才干净
    let subjectBalances = {
      1001: 0,
      1002: 0,
      1122: 0,
      1601: 0, // 资产类
      2202: 0,
      2203: 0,
      2221: 0, // 负债类
      4001: 0,
      4103: 0, // 权益类
    };

    // 3. 遍历凭证，累加发生额 (只算已生效的)
    const vouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    vouchers.forEach((v) => {
      if (v.status === "已审核" || v.status === "已记账") {
        if (v.lines) {
          v.lines.forEach((line) => {
            const code = line.account.split(" ")[0]; // 取科目代码
            const debit = parseFloat(line.debit) || 0;
            const credit = parseFloat(line.credit) || 0;

            // 动态初始化：如果凭证里用了新科目，自动加进来，初始为0
            if (subjectBalances[code] === undefined) subjectBalances[code] = 0;

            // ★★★ 核心计算公式 ★★★
            // 资产 (1开头)：借加贷减
            if (code.startsWith("1")) {
              subjectBalances[code] += debit - credit;
            }
            // 负债 (2开头) & 权益 (4开头)：贷加借减
            else if (code.startsWith("2") || code.startsWith("4")) {
              subjectBalances[code] += credit - debit;
            }
            // 损益类 (6开头) 不在这里直接算，而是通过下面的 currentProfit 汇总进来
          });
        }
      }
    });

    // 4. 注入本年利润 (这一步是平账的核心)
    // 把利润表算出来的钱，塞进 "4103 本年利润"
    subjectBalances["4103"] = (subjectBalances["4103"] || 0) + currentProfit;

    // 5. 分类与渲染
    let assets = { total: 0, items: [] };
    let liabilities = { total: 0, items: [] };
    let equity = { total: 0, items: [] };

    // 科目名称字典 (用于显示)
    const nameMap = {
      1001: "库存现金",
      1002: "银行存款",
      1122: "应收账款",
      1601: "固定资产",
      2202: "应付账款",
      2203: "预收账款",
      2221: "应交税费",
      4001: "实收资本",
      4103: "本年利润 (来自损益表)",
    };

    // 排序并分类
    Object.keys(subjectBalances)
      .sort()
      .forEach((code) => {
        const val = subjectBalances[code];
        // 只显示有余额的行，避免表格太长
        if (val !== 0) {
          const name = nameMap[code] || `科目 ${code}`;
          const item = { name: `${code} ${name}`, balance: val };

          if (code.startsWith("1")) {
            assets.items.push(item);
            assets.total += val;
          } else if (code.startsWith("2")) {
            liabilities.items.push(item);
            liabilities.total += val;
          } else if (code.startsWith("4")) {
            equity.items.push(item);
            equity.total += val;
          }
        }
      });

    // 6. 生成 HTML 行 (左右对齐)
    const maxRows = Math.max(
      assets.items.length,
      liabilities.items.length + equity.items.length
    );
    let rowsHTML = "";

    for (let i = 0; i < maxRows; i++) {
      const lItem = assets.items[i] || { name: "", balance: "" };

      // 右侧：先放负债，再放权益
      let rItem = { name: "", balance: "" };
      if (i < liabilities.items.length) {
        rItem = liabilities.items[i];
      } else {
        const eqIndex = i - liabilities.items.length;
        if (eqIndex < equity.items.length) rItem = equity.items[eqIndex];
      }

      const lVal =
        lItem.balance !== ""
          ? lItem.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })
          : "";
      const rVal =
        rItem.balance !== ""
          ? rItem.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })
          : "";

      rowsHTML += `
                        <tr>
                            <td>${lItem.name}</td>
                            <td style="text-align:right; color:#2980b9;">${lVal}</td>
                            <td style="border-left: 1px solid #eee;">${rItem.name}</td>
                            <td style="text-align:right; color:#e74c3c;">${rVal}</td>
                        </tr>
                    `;
    }

    // 7. 平衡检查
    // 资产 = 负债 + 权益 (允许 0.01 的计算误差)
    const rightTotal = liabilities.total + equity.total;
    const isBalanced = Math.abs(assets.total - rightTotal) < 0.01;

    contentHTML += `
                    <h2>资产负债表 ⚖️</h2>
                    <p style="color: #7f8c8d;">数据来源：仅包含您录入的有效凭证。期初余额已清零。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; margin-bottom: 20px;">
                        <button class="btn-primary" onclick="loadContent('ReportBalanceSheet')">刷新报表</button>
                        <span style="margin-left:20px; font-weight:bold; font-size:16px; color:${
                          isBalanced ? "#27ae60" : "red"
                        };">
                            ${
                              isBalanced
                                ? "✅ 报表平衡"
                                : "❌ 报表不平 (请检查凭证录入)"
                            }
                        </span>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr style="background-color: #ecf0f1;">
                                <th width="25%">资产 (Assets)</th>
                                <th width="25%" style="text-align: right;">期末余额</th>
                                <th width="25%" style="border-left: 1px solid #ccc;">负债及权益 (Liab & Equity)</th>
                                <th width="25%" style="text-align: right;">期末余额</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                              rowsHTML ||
                              '<tr><td colspan="4" style="text-align:center; padding:20px; color:#ccc;">暂无数据，请先录入凭证</td></tr>'
                            }
                        </tbody>
                        <tfoot>
                            <tr style="background-color: #f9f9f9; font-weight:bold; font-size:16px;">
                                <td>资产总计</td>
                                <td style="text-align: right;">${assets.total.toLocaleString(
                                  "en-US",
                                  { minimumFractionDigits: 2 }
                                )}</td>
                                <td style="border-left: 1px solid #ccc;">负债及权益总计</td>
                                <td style="text-align: right;">${rightTotal.toLocaleString(
                                  "en-US",
                                  { minimumFractionDigits: 2 }
                                )}</td>
                            </tr>
                        </tfoot>
                    </table>
                `;
  }


  // =========================================================================
  // 46. 利润损益表 (ReportIncomeStatement) - [智能识别版]
  // =========================================================================
  else if (moduleCode === "ReportIncomeStatement") {
    let data = {
      income: 0,
      cost: 0,
      saleExp: 0,
      adminExp: 0,
      finExp: 0,
      tax: 0,
    };
    const vouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    vouchers.forEach((v) => {
      if (v.status === "已审核" || v.status === "已记账") {
        if (v.lines) {
          v.lines.forEach((line) => {
            const account = line.account ? line.account.trim() : "";
            const code = account.split(" ")[0];
            const val = parseFloat(line.debit) || 0;
            const valCredit = parseFloat(line.credit) || 0;

            // ★★★ 智能匹配逻辑 (同时匹配代码和中文) ★★★

            // 1. 收入 (60开头 或 包含"收入") - 通常记贷方
            if (
              code.startsWith("60") ||
              code.startsWith("61") ||
              code.startsWith("63") ||
              account.includes("收入")
            ) {
              data.income += valCredit;
            }
            // 2. 成本 (64开头 或 包含"成本") - 通常记借方
            else if (
              code.startsWith("6401") ||
              code.startsWith("6402") ||
              account.includes("成本")
            ) {
              data.cost += val;
            }
            // 3. 税金 (6403 或 包含"税金")
            else if (code.startsWith("6403") || account.includes("税金")) {
              data.tax += val;
            }
            // 4. 销售费用 (6601 或 包含"销售")
            else if (code.startsWith("6601") || account.includes("销售")) {
              data.saleExp += val;
            }
            // 5. 管理费用 (6602 或 包含"管理"、"办公"、"工资")
            else if (
              code.startsWith("6602") ||
              account.includes("管理") ||
              account.includes("办公") ||
              account.includes("工资")
            ) {
              data.adminExp += val;
            }
            // 6. 财务费用 (6603 或 包含"财务"、"利息")
            else if (
              code.startsWith("6603") ||
              account.includes("财务") ||
              account.includes("利息")
            ) {
              data.finExp += val;
            }
          });
        }
      }
    });

    // 计算利润
    const opProfit =
      data.income -
      data.cost -
      data.tax -
      data.saleExp -
      data.adminExp -
      data.finExp;
    const netProfit = opProfit; // 简化

    const fmt = (num) =>
      num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    const color = (num) =>
      num < 0 ? "color: #e74c3c; font-weight:bold;" : "color: #333;";

    contentHTML += `
                    <h2>利润损益表  📈</h2>
                    <p style="color: #7f8c8d;">报告特定会计期间的经营成果，数据来源于已记账凭证。随时监控经营情况</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <button class="btn-primary" onclick="loadContent('ReportIncomeStatement')">刷新报表</button>
                    </div>

                    <div style="background:white; padding:20px; border-radius:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <table class="data-table">
                            <thead>
                                <tr style="background-color: #ecf0f1;">
                                    <th style="width: 50%;">项 目</th>
                                    <th style="text-align: right;">本期金额 (RMB)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="font-weight:bold;">一、营业收入</td>
                                    <td style="text-align: right; font-weight:bold;">${fmt(
                                      data.income
                                    )}</td>
                                </tr>
                                <tr>
                                    <td style="padding-left: 20px;">减：营业成本</td>
                                    <td style="text-align: right;">${fmt(
                                      data.cost
                                    )}</td>
                                </tr>
                                <tr>
                                    <td style="padding-left: 20px;">管理费用 (含工资)</td>
                                    <td style="text-align: right;">${fmt(
                                      data.adminExp
                                    )}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight:bold;">二、营业利润</td>
                                    <td style="text-align: right; ${color(
                                      opProfit
                                    )}">${fmt(opProfit)}</td>
                                </tr>
                                <tr style="background-color: #f0fdf4;">
                                    <td style="font-weight:bold; font-size:16px;">三、净利润</td>
                                    <td style="text-align: right; font-size:16px; ${color(
                                      netProfit
                                    )}">${fmt(netProfit)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
  }

  // =========================================================================
  // 47. 现金流量表 (ReportCashFlow) - [自动分析版]
  // =========================================================================
  else if (moduleCode === "ReportCashFlow") {
    let cashFlows = [];
    let totalIn = 0;
    let totalOut = 0;

    const vouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    vouchers.forEach((v) => {
      if (v.status === "已审核" || v.status === "已记账") {
        if (!v.lines) return;

        // 检查这张凭证里有没有涉及资金 (1001 或 1002)
        const cashLine = v.lines.find(
          (l) => l.account.startsWith("1001") || l.account.startsWith("1002")
        );

        if (cashLine) {
          // 找到了资金行，开始分析
          const isDebit = parseFloat(cashLine.debit) > 0; // 借方表示钱增加了(流入)
          const amount = isDebit
            ? parseFloat(cashLine.debit)
            : parseFloat(cashLine.credit);

          // 找对方科目 (简单逻辑：找分录里第一行不是资金的科目)
          const otherLine = v.lines.find(
            (l) =>
              !l.account.startsWith("1001") && !l.account.startsWith("1002")
          ) || { account: "未知", summary: "未说明" };
          const otherCode = otherLine.account.split(" ")[0];

          // 判定类型
          let type = "经营活动"; // 默认为经营
          let item = "支付/收到其他款项";

          if (isDebit) {
            totalIn += amount;
            if (otherCode.startsWith("60") || otherCode.startsWith("1122"))
              item = "销售商品、提供劳务收到的现金";
            else if (otherCode.startsWith("20") || otherCode.startsWith("25")) {
              type = "筹资活动";
              item = "取得借款收到的现金";
            }
          } else {
            totalOut += amount;
            if (otherCode.startsWith("64") || otherCode.startsWith("2202"))
              item = "购买商品、接受劳务支付的现金";
            else if (
              otherCode.startsWith("6602") &&
              otherLine.account.includes("工资")
            )
              item = "支付给职工以及为职工支付的现金";
            else if (otherCode.startsWith("16")) {
              type = "投资活动";
              item = "购建固定资产支付的现金";
            }
          }

          cashFlows.push({
            date: v.date,
            type: type,
            item: item,
            direction: isDebit ? "流入 (+)" : "流出 (-)",
            amount: amount,
            summary: v.lines[0].summary, // 取凭证摘要
          });
        }
      }
    });

    // 生成 HTML
    const rowsHTML = cashFlows
      .map(
        (c) => `
                    <tr>
                        <td>${c.type}</td>
                        <td>${c.item}</td>
                        <td><span style="color:${
                          c.direction.includes("+") ? "#27ae60" : "#e74c3c"
                        }">${c.direction}</span></td>
                        <td>${c.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}</td>
                        <td style="color:#999; font-size:12px;">${c.summary} (${
          c.date
        })</td>
                    </tr>
                `
      )
      .join("");

    const emptyRow =
      cashFlows.length === 0
        ? '<tr><td colspan="5" style="text-align:center; padding:20px; color:#ccc;">本期暂无现金收支记录</td></tr>'
        : "";

    contentHTML += `
                    <h2>现金流量表  💸</h2>
                    <p style="color: #7f8c8d;">基于凭证自动分析现金流入流出情况 (直接法模拟)。</p>
                    
                    <div class="dashboard-grid" style="grid-template-columns: 1fr 1fr 1fr; margin-bottom:20px;">
                        <div class="kpi-card"><div class="kpi-title">现金流入总额</div><div class="kpi-value" style="color:#27ae60;">+${totalIn.toLocaleString()}</div></div>
                        <div class="kpi-card"><div class="kpi-title">现金流出总额</div><div class="kpi-value" style="color:#e74c3c;">-${totalOut.toLocaleString()}</div></div>
                        <div class="kpi-card"><div class="kpi-title">净现金流</div><div class="kpi-value" style="color:#2980b9;">${(
                          totalIn - totalOut
                        ).toLocaleString()}</div></div>
                    </div>

                    <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px;">
                        <button class="btn-primary" onclick="loadContent('ReportCashFlow')">刷新数据</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>活动分类</th>
                                <th>现金流量项目</th>
                                <th>方向</th>
                                <th>金额 (RMB)</th>
                                <th>凭证摘要/来源</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                            ${emptyRow}
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 48. 其他法定报表 (ReportOtherStatutory) - 20 条数据
  // =========================================================================
  else if (moduleCode === "ReportOtherStatutory") {
    const auxiliaryRows = generateTableRows(20, (i) => {
      const clientName = `客户 ${i} (公司)`;
      const initialBalance = (50000 + i * 200).toFixed(2);
      const debit = (10000 + i * 50).toFixed(2);
      const credit = (5000 + i * 10).toFixed(2);
      const endBalance = (
        parseFloat(initialBalance) +
        parseFloat(debit) -
        parseFloat(credit)
      ).toFixed(2);
      const status =
        i % 5 === 0 ? '<span style="color: #e74c3c;">超期</span>' : "正常";

      return `
                        <tr>
                            <td>${clientName}</td>
                            <td style="text-align: right;">${initialBalance}</td>
                            <td style="text-align: right;">${debit}</td>
                            <td style="text-align: right;">${credit}</td>
                            <td style="text-align: right;">${endBalance}</td>
                            <td>${status}</td>
                            <td><a href="#" style="color:#3498db;">明细账</a></td>
                        </tr>
                    `;
    });

    contentHTML += `
                    <h2>其他法定报表 📃</h2>
                    <p style="color: #7f8c8d;">管理和生成除三大主表之外的、满足税务或监管要求的法定报表。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;"><option>辅助账余额表</option></select>
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;"><option>客户</option></select>
                            <input type="date" placeholder="截止日期" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <button class="btn-primary">生成报表</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">导出 Excel</button>
                        <button class="btn-primary" style="background-color: #3498db;">批量归档</button>
                    </div>

                    <h3>报表列表 (客户辅助账余额表, 共 20 条)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>辅助核算项 (客户名称)</th>
                                <th style="text-align: right;">期初余额 (RMB)</th>
                                <th style="text-align: right;">本期借方发生额 (RMB)</th>
                                <th style="text-align: right;">本期贷方发生额 (RMB)</th>
                                <th style="text-align: right;">期末余额 (RMB)</th>
                                <th>账龄状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${auxiliaryRows}
                        </tbody>
                    </table>
                `;
  }
  // =========================================================================
  // 49. 单车线路盈亏分析 (ReportVehicleProfit)
  // =========================================================================
  else if (moduleCode === "ReportVehicleProfit") {
    contentHTML += `
                    <h2>单车线路盈亏分析 🚚</h2>
                    <p style="color: #7f8c8d;">按车辆和运输线路维度，分析收入、直接成本、间接成本和毛利，评估运输资产的盈利能力。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">报告期间</option>
                                <option>2025年11月</option>
                                <option>2025年Q4</option>
                            </select>
                            <input type="text" placeholder="车牌号 / 线路名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">排序依据</option>
                                <option>毛利率 (降序)</option>
                                <option>总毛利 (降序)</option>
                            </select>
                            <button class="btn-primary" style="background-color: #3498db;">生成分析</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">导出 Excel</button>
                    </div>

                    <h3>线路盈亏明细 (2025年11月)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>线路/车牌号</th>
                                <th style="text-align: right;">总收入 (RMB)</th>
                                <th style="text-align: right;">总成本 (RMB)</th>
                                <th style="text-align: right;">毛利 (RMB)</th>
                                <th style="text-align: right;">毛利率 (%)</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>沪A·8888 (沪-深线)</td>
                                <td style="text-align: right;">150,000.00</td>
                                <td style="text-align: right;">105,000.00</td>
                                <td style="text-align: right;">45,000.00</td>
                                <td style="text-align: right;"><strong style="color: #27ae60;">30.0%</strong></td>
                                <td>盈利</td>
                            </tr>
                            <tr>
                                <td>京B·6666 (京-津线)</td>
                                <td style="text-align: right;">80,000.00</td>
                                <td style="text-align: right;">82,000.00</td>
                                <td style="text-align: right;"><span style="color: #e74c3c;">-2,000.00</span></td>
                                <td style="text-align: right;"><strong style="color: #e74c3c;">-2.5%</strong></td>
                                <td>亏损</td>
                            </tr>
                            <tr>
                                <td>**线路总计**</td>
                                <td style="text-align: right; font-weight: bold;">2,500,000.00</td>
                                <td style="text-align: right; font-weight: bold;">1,800,000.00</td>
                                <td style="text-align: right; font-weight: bold; color: #2980b9;">700,000.00</td>
                                <td style="text-align: right; font-weight: bold; color: #2980b9;">28.0%</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }
  // =========================================================================
  // 50. 客户毛利分析 (ReportCustomerProfit)
  // =========================================================================
  else if (moduleCode === "ReportCustomerProfit") {
    contentHTML += `
                    <h2>客户毛利分析 👥</h2>
                    <p style="color: #7f8c8d;">按客户维度分析收入贡献、服务成本和毛利，识别高价值客户和低效服务项目。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">报告期间</option>
                                <option>2025年11月</option>
                                <option>2025年Q4</option>
                            </select>
                            <input type="text" placeholder="客户名称 / 客户组" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">毛利率范围</option>
                                <option>低于 10%</option>
                                <option>高于 30%</option>
                            </select>
                            <button class="btn-primary" style="background-color: #3498db;">生成分析</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">导出 Excel</button>
                        <button class="btn-primary" style="background-color: #f39c12;">查看毛利图谱</button>
                    </div>

                    <h3>客户毛利明细 (2025年11月)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>客户名称</th>
                                <th style="text-align: right;">收入总额 (RMB)</th>
                                <th style="text-align: right;">总服务成本 (RMB)</th>
                                <th style="text-align: right;">毛利 (RMB)</th>
                                <th style="text-align: right;">毛利率 (%)</th>
                                <th>订单数</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A. 电子科技集团</td>
                                <td style="text-align: right;">500,000.00</td>
                                <td style="text-align: right;">300,000.00</td>
                                <td style="text-align: right;">200,000.00</td>
                                <td style="text-align: right;"><strong style="color: #27ae60;">40.0%</strong></td>
                                <td>150</td>
                            </tr>
                            <tr>
                                <td>B. 传统制造有限公司</td>
                                <td style="text-align: right;">120,000.00</td>
                                <td style="text-align: right;">115,000.00</td>
                                <td style="text-align: right;"><span style="color: #e74c3c;">5,000.00</span></td>
                                <td style="text-align: right;"><strong style="color: #e74c3c;">4.2%</strong></td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <td>**客户总计**</td>
                                <td style="text-align: right; font-weight: bold;">4,500,000.00</td>
                                <td style="text-align: right; font-weight: bold;">3,000,000.00</td>
                                <td style="text-align: right; font-weight: bold; color: #2980b9;">1,500,000.00</td>
                                <td style="text-align: right; font-weight: bold; color: #2980b9;">33.3%</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }
  // =========================================================================
  // 51. 应收应付账龄分析 (ReportARAPAge)
  // =========================================================================
  else if (moduleCode === "ReportARAPAge") {
    contentHTML += `
                    <h2>应收应付账龄分析 ⏳</h2>
                    <p style="color: #7f8c8d;">分析应收/应付账款的账期分布，评估资金周转和坏账风险。按客户/供应商进行明细划分。</p>
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">分析对象</option>
                                <option>应收账款 (A/R)</option>
                                <option>应付账款 (A/P)</option>
                            </select>
                            <input type="date" placeholder="截止日期" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;">
                            <button class="btn-primary" style="background-color: #3498db;">生成分析</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;">导出 Excel</button>
                        <button class="btn-primary" style="background-color: #34495e;">查看账龄图表</button>
                    </div>

                    <h3>应收账款账龄分布 (截止 2025-11-30)</h3>
                    <table class="data-table">
                        <thead>
                            <tr style="background-color: #ecf0f1;">
                                <th>客户/供应商</th>
                                <th style="text-align: right;">总余额 (RMB)</th>
                                <th style="text-align: right;">< 30天 (RMB)</th>
                                <th style="text-align: right;">30-90天 (RMB)</th>
                                <th style="text-align: right;">91-180天 (RMB)</th>
                                <th style="text-align: right;">> 180天 (RMB)</th>
                                <th>催收状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>客户 C - 华南分部</td>
                                <td style="text-align: right;">250,000.00</td>
                                <td style="text-align: right;">180,000.00</td>
                                <td style="text-align: right;">50,000.00</td>
                                <td style="text-align: right;">15,000.00</td>
                                <td style="text-align: right;"><strong style="color: #e74c3c;">5,000.00</strong></td>
                                <td>需催收</td>
                            </tr>
                            <tr>
                                <td>客户 D - 华东分部</td>
                                <td style="text-align: right;">80,000.00</td>
                                <td style="text-align: right;">80,000.00</td>
                                <td style="text-align: right;">0.00</td>
                                <td style="text-align: right;">0.00</td>
                                <td style="text-align: right;">0.00</td>
                                <td>正常</td>
                            </tr>
                            <tr>
                                <td>**总计**</td>
                                <td style="text-align: right; font-weight: bold;">5,000,000.00</td>
                                <td style="text-align: right; font-weight: bold;">3,500,000.00</td>
                                <td style="text-align: right; font-weight: bold;">1,000,000.00</td>
                                <td style="text-align: right; font-weight: bold;">350,000.00</td>
                                <td style="text-align: right; font-weight: bold; color: #e74c3c;">150,000.00</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 40. 科目明细账 (AcctSubjectDetail) - [修复版：智能识别借贷方向]
  // =========================================================================
  else if (moduleCode === "AcctSubjectDetail") {
    const targetCode = sessionStorage.getItem("CurrentSubjectCode") || "1002";
    const targetName =
      sessionStorage.getItem("CurrentSubjectName") || "银行存款";
    const vouchers = JSON.parse(
      sessionStorage.getItem("ManualVouchers") || "[]"
    );

    // 1. ★★★ 核心修复：定义科目的“默认方向” ★★★
    // 资产/成本/费用类 (1xxx, 5xxx, 6xxx) -> 默认 "借"
    // 负债/权益/收入类 (2xxx, 3xxx, 4xxx) -> 默认 "贷"
    const firstDigit = targetCode.charAt(0);
    const defaultDir = ["2", "3", "4", "60"].some((prefix) =>
      targetCode.startsWith(prefix)
    )
      ? "贷"
      : "借";

    // 2. 设置期初余额 (模拟)
    // 假设：银行存款有期初，应付账款期初为0
    let currentBalance = targetCode === "1002" ? 800000 : 0;

    // 3. 生成“期初余额”行
    // 如果余额为0，方向显示“平”，否则显示默认方向
    const startDirText = currentBalance === 0 ? "平" : defaultDir;

    let tableHTML = `
                    <tr style="background-color:#fdfdfd; color:#999;">
                        <td>2025-11-01</td>
                        <td>-</td>
                        <td>期初余额</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${startDirText}</td>
                        <td style="text-align:right;">${currentBalance.toLocaleString(
                          "en-US",
                          { minimumFractionDigits: 2 }
                        )}</td>
                    </tr>
                `;

    // 4. 遍历凭证计算
    const sortedVouchers = [...vouchers].reverse(); // 按时间顺序

    sortedVouchers.forEach((v) => {
      if (v.status === "已审核" || v.status === "已记账") {
        if (v.lines) {
          v.lines.forEach((line) => {
            if (line.account.startsWith(targetCode)) {
              const debit = parseFloat(line.debit) || 0;
              const credit = parseFloat(line.credit) || 0;

              // ★★★ 核心修复：根据方向计算余额 ★★★
              if (defaultDir === "借") {
                // 资产类：余额 = 上次余额 + 借 - 贷
                currentBalance = currentBalance + debit - credit;
              } else {
                // 负债类(如应付账款)：余额 = 上次余额 + 贷 - 借
                currentBalance = currentBalance + credit - debit;
              }

              // 计算当前行的方向文字
              let dirText = "平";
              if (currentBalance > 0) dirText = defaultDir; // 还是欠钱/有钱
              else if (currentBalance < 0)
                dirText = defaultDir === "借" ? "贷" : "借"; // 变成反方向了(比如银行透支)

              tableHTML += `
                                        <tr>
                                            <td>${v.date}</td>
                                            <td><a href="#" onclick="openVoucherDetail(this)" class="val-id" style="color:#3498db;">${
                                              v.id
                                            }</a></td>
                                            <td>${line.summary}</td>
                                            <td style="text-align:right;">${
                                              debit
                                                ? debit.toLocaleString(
                                                    "en-US",
                                                    { minimumFractionDigits: 2 }
                                                  )
                                                : ""
                                            }</td>
                                            <td style="text-align:right;">${
                                              credit
                                                ? credit.toLocaleString(
                                                    "en-US",
                                                    { minimumFractionDigits: 2 }
                                                  )
                                                : ""
                                            }</td>
                                            <td>${dirText}</td>
                                            <td style="text-align:right; font-weight:bold;">${Math.abs(
                                              currentBalance
                                            ).toLocaleString("en-US", {
                                              minimumFractionDigits: 2,
                                            })}</td>
                                        </tr>
                                    `;
            }
          });
        }
      }
    });

    contentHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <h2>科目明细账：<span style="color:#2980b9;">${targetCode} ${targetName}</span></h2>
                        <button class="btn-primary" style="background-color: #95a5a6;" onclick="loadContent('AcctSubjectSummary')"> < 返回汇总表</button>
                    </div>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items:center;">
                            <input type="date" value="2025-11-01" style="padding:8px; border:1px solid #ccc;">
                            <span>至</span>
                            <input type="date" value="2025-11-30" style="padding:8px; border:1px solid #ccc;">
                            <input type="text" placeholder="摘要关键词" style="padding:8px; border:1px solid #ccc;">
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>凭证号</th>
                                <th style="width:30%;">摘要</th>
                                <th style="text-align:right;">借方金额</th>
                                <th style="text-align:right;">贷方金额</th>
                                <th>方向</th>
                                <th style="text-align:right;">余额</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableHTML}
                        </tbody>
                    </table>
                    
                    <div style="margin-top:10px; font-size:12px; color:#7f8c8d;">
                        * 注：${targetCode} 属于 <strong>${defaultDir}方科目</strong>，${
      defaultDir === "借"
        ? "借方表示增加，贷方表示减少"
        : "贷方表示增加，借方表示减少"
    }。
                    </div>
                `;
  }

  // =========================================================================
  // 50. 员工花名册 (HREmployee) - [人员基础库]
  // =========================================================================
  else if (moduleCode === "HREmployee") {
    // 1. 读取员工数据
    let employees = JSON.parse(sessionStorage.getItem("HREmployees"));
    if (!employees) {
      employees = [
        {
          id: "EMP001",
          name: "张三",
          dept: "运输部",
          position: "车队长",
          bankAccount: "6222021001...",
          status: "在职",
          salaryBase: 5000,
        },
        {
          id: "EMP002",
          name: "李四",
          dept: "财务部",
          position: "会计",
          bankAccount: "6222021002...",
          status: "在职",
          salaryBase: 8000,
        },
        {
          id: "EMP003",
          name: "王五",
          dept: "销售部",
          position: "销售经理",
          bankAccount: "6222021003...",
          status: "离职",
          salaryBase: 0,
        },
      ];
      sessionStorage.setItem("HREmployees", JSON.stringify(employees));
    }

    const rows = employees
      .map(
        (e) => `
                    <tr style="${
                      e.status === "离职"
                        ? "color:#999; background:#f5f5f5;"
                        : ""
                    }">
                        <td>${e.id}</td>
                        <td><strong>${e.name}</strong></td>
                        <td>${e.dept}</td>
                        <td>${e.position}</td>
                        <td>${e.bankAccount}</td>
                        <td><span style="color:${
                          e.status === "在职" ? "#27ae60" : "#999"
                        }">${e.status}</span></td>
                        <td>
                            <a href="javascript:void(0)" onclick="editEmployee('${
                              e.id
                            }')" style="color:#3498db;">编辑</a>
                        </td>
                    </tr>
                `
      )
      .join("");

    contentHTML += `
                    <h2>员工花名册 </h2>
                    <p style="color: #7f8c8d;">维护公司全员档案。财务发工资、报销打款时，将直接调用此处的【银行卡号】。</p>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;" onclick="addEmployee()">+ 新增员工</button>
                        <button class="btn-primary" style="background-color: #3498db;">同步钉钉/企微数据</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>工号</th>
                                <th>姓名</th>
                                <th>部门</th>
                                <th>职位</th>
                                <th>银行卡号 (发薪用)</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 51. 薪酬核算与发放 (HRSalary) - [与财务核心联动]
  // =========================================================================
  else if (moduleCode === "HRSalary") {
    // 1. 读取薪资单
    let payrolls = JSON.parse(sessionStorage.getItem("HRPayrolls") || "[]");

    const rows = payrolls
      .map((p) => {
        let statusHtml = "";
        let actionHtml = "";

        if (p.status === "待发放") {
          statusHtml = `<span style="color: #f39c12; font-weight:bold;">待发放</span>`;
          // ★★★ 核心联动按钮：点击后调用财务发钱 ★★★
          actionHtml = `<button class="btn-primary" style="padding:4px 10px;" onclick="paySalary('${p.id}')">执行发薪</button>`;
        } else {
          statusHtml = `<span style="color: #27ae60; font-weight:bold;">已发放</span>`;
          actionHtml = `<span style="color:#ccc">凭证: ${
            p.voucherId || "-"
          }</span>`;
        }

        return `
                <tr>
                    <td>${p.period}</td>
                    <td>${p.dept}</td>
                    <td>
                        <a href="javascript:void(0)" onclick="viewPayrollDetail('${p.id}')" style="color:#3498db; font-weight:bold;">
                            ${p.count} 人 (查看明细)
                        </a>
                    </td>
                    <td style="text-align:right; font-weight:bold;">${p.totalAmount}</td>
                    <td>${statusHtml}</td>
                    <td>${actionHtml}</td>
                </tr>
            `;
      })
      .join("");

    contentHTML += `
                    <h2>薪酬核算与发放</h2>
                    <p style="color: #7f8c8d;">每月核算各部门工资。点击“执行发薪”将自动调用资金模块进行打款，并生成财务凭证。</p>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;" onclick="createMonthlyPayroll()">+ 核算本月工资</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>工资月份</th>
                                <th>部门</th>
                                <th>发薪人数</th>
                                <th style="text-align:right;">实发总额 (RMB)</th>
                                <th>状态</th>
                                <th>操作 (财务联动)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                              rows.length > 0
                                ? rows
                                : '<tr><td colspan="6" style="text-align:center; padding:20px; color:#ccc;">暂无工资单</td></tr>'
                            }
                        </tbody>
                    </table>
                `;
  }

  // =========================================================================
  // 52. 薪资明细详情页 (HRSalaryDetail) - [修复版：补全 fmt 函数定义]
  // =========================================================================
  else if (moduleCode === "HRSalaryDetail") {
    const payroll = window.g_currentPayrollView || { period: "-", details: [] };

    // ★★★★★ 核心修复点：必须先定义这两个函数，下面才能用！ ★★★★★
    // v(val): 如果数据是空的(undefined)，就当成 0 处理
    const v = (val) => (typeof val === "number" ? val : 0);

    // fmt(val): 把数字变成 "1,234.56" 这种好看的格式
    const fmt = (val) =>
      v(val).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

    const rows = payroll.details
      .map(
        (d, i) => `
                    <tr>
                        <td style="background:#fff; position:sticky; left:0; z-index:1; border-right:2px solid #eee;">
                            <strong>${d.name}</strong>
                        </td>
                        
                        <td style="color:#666;">${fmt(d.base)}</td>
                        <td style="color:#666;">${fmt(d.perfSalary)}</td>
                        <td style="color:#27ae60; font-weight:bold; background:#f9fff9;">${fmt(
                          d.gross
                        )}</td>
                        
                        <td style="color:#999;">${fmt(d.ssBase)}</td>
                        <td style="color:#666;">${fmt(d.p_pension)}</td>
                        <td style="color:#666;">${fmt(d.p_med)}</td>
                        <td style="color:#666;">${fmt(d.p_unemp)}</td>
                        <td style="color:#999; background:#f0f5ff;">${fmt(
                          d.fundBase
                        )}</td>
                        <td style="color:#1890ff; background:#f0f5ff; font-weight:bold;">${fmt(
                          d.p_fund
                        )}</td>
                        <td style="color:#c0392b; font-weight:bold; background:#fff5f5;">-${fmt(
                          d.p_total
                        )}</td>
                        
                        <td style="color:#999;">${fmt(d.taxable)}</td>
                        <td style="color:#c0392b; font-weight:bold;">-${fmt(
                          d.tax
                        )}</td>
                        
                        <td style="background:#e6f7ff; font-weight:bold; color:#1890ff; font-size:15px; border-left:2px solid #1890ff; border-right:2px solid #1890ff;">
                            ${fmt(d.net)}
                        </td>
                        
                        <td style="border-left:2px solid #eee; color:#666;">${fmt(
                          d.c_pension
                        )}</td>
                        <td style="color:#666;">${fmt(d.c_med)}</td>
                        <td style="color:#666;">${fmt(d.c_unemp)}</td>
                        <td style="color:#666;">${fmt(d.c_injury)}</td>
                        <td style="color:#666;">${fmt(d.c_birth)}</td>
                        <td style="color:#1890ff; font-weight:bold;">${fmt(
                          d.c_fund
                        )}</td>
                        <td style="font-weight:bold; color:#555;">${fmt(
                          d.c_total
                        )}</td>
                    </tr>
                `
      )
      .join("");

    // 统计行计算 (也加上防崩逻辑)
    const sumGross = payroll.details.reduce((a, b) => a + v(b.gross), 0);
    const sumDeduct = payroll.details.reduce(
      (a, b) => a + v(b.p_total) + v(b.tax),
      0
    );

    contentHTML += `
                    <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; gap:10px;">
                            <button class="btn-primary" style="background-color: #95a5a6;" onclick="loadContent('HRSalary')"> < 返回列表</button>
                            <h2>${payroll.period} 全员薪资核对表</h2>
                        </div>
                        <button class="btn-primary" style="background-color: #27ae60;">导出 Excel</button>
                    </div>

                    <div style="background:#fff; padding:15px; border:1px solid #ddd; border-radius:6px; margin-bottom:15px; display:flex; gap:40px; align-items:center;">
                        <div>
                            <span style="color:#666; font-size:12px;">应发总额</span><br>
                            <span style="font-size:18px; font-weight:bold; color:#27ae60;">${fmt(
                              sumGross
                            )}</span>
                        </div>
                        <div style="font-size:20px; color:#ddd;">-</div>
                        <div>
                            <span style="color:#666; font-size:12px;">个人扣款+个税</span><br>
                            <span style="font-size:18px; font-weight:bold; color:#e74c3c;">${fmt(
                              sumDeduct
                            )}</span>
                        </div>
                        <div style="font-size:20px; color:#ddd;">=</div>
                        <div>
                            <span style="color:#666; font-size:12px;">实发总额 (打卡)</span><br>
                            <span style="font-size:22px; font-weight:bold; color:#1890ff;">${
                              payroll.totalAmount
                            }</span>
                        </div>
                        <div style="margin-left:auto; text-align:right;">
                            <span style="color:#666; font-size:12px;">公司总成本</span><br>
                            <span style="font-size:16px; font-weight:bold; color:#555;">${
                              payroll.totalCost
                            }</span>
                        </div>
                    </div>

                    <div style="overflow-x: auto; white-space: nowrap; border: 1px solid #ccc; max-height: 600px; background:#fff;">
                        <table class="data-table" style="margin:0; border-collapse: collapse;">
                            <thead>
                                <tr style="background:#f7f9fa; color:#333;">
                                    <th rowspan="2" style="position:sticky; left:0; z-index:2; background:#f7f9fa; border-right:2px solid #ddd; min-width:80px;">姓名</th>
                                    <th colspan="3" style="text-align:center; border-bottom:3px solid #27ae60; color:#27ae60; background:#f0fdf4;">收入</th>
                                    <th colspan="7" style="text-align:center; border-bottom:3px solid #e74c3c; color:#e74c3c; background:#fff5f5;">个人代扣</th>
                                    <th colspan="2" style="text-align:center; border-bottom:3px solid #c0392b; color:#c0392b;">个税</th>
                                    <th rowspan="2" style="min-width:100px; background:#e6f7ff; color:#1890ff; border-left:2px solid #1890ff; border-right:2px solid #1890ff; text-align:center;">实发工资</th>
                                    <th colspan="7" style="text-align:center; border-bottom:3px solid #999; color:#666; background:#f5f5f5; border-left:2px solid #eee;">公司承担</th>
                                </tr>
                                <tr style="background:#f7f9fa; color:#555; font-size:13px;">
                                    <th style="min-width:80px; background:#f0fdf4;">基本工资</th>
                                    <th style="min-width:80px; background:#f0fdf4;">绩效工资</th>
                                    <th style="min-width:90px; background:#f0fdf4; color:#27ae60; font-weight:bold;">应发合计</th>
                                    
                                    <th style="min-width:80px; background:#fff5f5;">社保基数</th>
                                    <th style="background:#fff5f5;">养老</th>
                                    <th style="background:#fff5f5;">医疗</th>
                                    <th style="background:#fff5f5;">失业</th>
                                    <th style="min-width:80px; background:#fff5f5;">公积金基数</th>
                                    <th style="background:#fff5f5;">公积金</th>
                                    <th style="color:#e74c3c; background:#fff5f5; font-weight:bold;">扣款小计</th>
                                    
                                    <th>应纳税额</th>
                                    <th style="color:#c0392b; font-weight:bold;">个税</th>

                                    <th style="border-left:2px solid #eee; background:#f5f5f5;">养老</th>
                                    <th style="background:#f5f5f5;">医疗</th>
                                    <th style="background:#f5f5f5;">失业</th>
                                    <th style="background:#f5f5f5;">工伤</th>
                                    <th style="background:#f5f5f5;">生育</th>
                                    <th style="background:#f5f5f5;">公积金</th>
                                    <th style="background:#f5f5f5;">成本小计</th>
                                </tr>
                            </thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                `;
  }

  // =========================================================================
  // 53. 薪酬规则配置 (HRSalaryConfig) - [新增：社保/个税设置]
  // =========================================================================
  else if (moduleCode === "HRSalaryConfig") {
    // 1. 读取配置 (如果没有就读取默认值)
    // 这里的 initSocialSecurityConfig 来自 config.js
    if (typeof window.initSocialSecurityConfig === "function")
      window.initSocialSecurityConfig();
    const conf = JSON.parse(sessionStorage.getItem("HR_SS_Config"));

    // ... 在 HRSalaryConfig 模块内 ...

    contentHTML += `
                    <h2>薪酬规则配置  ⚙️</h2>
                    <p style="color: #7f8c8d;">设置企业社保公积金缴纳比例、基数上下限及个税起征点。</p>

                    <div style="background:white; padding:30px; border-radius:8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); max-width: 900px;">
                        
                        <h3 style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px; color:#2980b9;">1. 五险一金缴纳比例 (%)</h3>
                        <table class="data-table" style="margin-bottom:20px;">
                            <thead>
                                <tr>
                                    <th width="25%">险种</th>
                                    <th width="25%">个人承担比例</th>
                                    <th width="25%">公司承担比例</th>
                                    <th>说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>养老保险</td>
                                    <td><input type="number" id="conf-pension-pers" value="${
                                      conf.pension.pers * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td><input type="number" id="conf-pension-comp" value="${
                                      conf.pension.comp * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td style="color:#999; font-size:12px;"></td>
                                </tr>
                                <tr>
                                    <td>医疗保险</td>
                                    <td><input type="number" id="conf-medical-pers" value="${
                                      conf.medical.pers * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td><input type="number" id="conf-medical-comp" value="${
                                      conf.medical.comp * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td style="color:#999; font-size:12px;">含大病医保</td>
                                </tr>
                                <tr>
                                    <td>失业保险</td>
                                    <td><input type="number" id="conf-unemp-pers" value="${
                                      conf.unemp.pers * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td><input type="number" id="conf-unemp-comp" value="${
                                      conf.unemp.comp * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td style="color:#999; font-size:12px;"></td>
                                </tr>
                                <tr>
                                    <td>工伤保险</td>
                                    <td><input type="number" value="0" disabled style="width:60px; background:#f5f5f5; text-align:center; border:1px solid #ddd;"> %</td>
                                    <td><input type="number" id="conf-injury-comp" value="${
                                      conf.injury.comp * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td style="color:#999; font-size:12px;">个人无需缴纳</td>
                                </tr>
                                <tr>
                                    <td>生育保险</td>
                                    <td><input type="number" value="0" disabled style="width:60px; background:#f5f5f5; text-align:center; border:1px solid #ddd;"> %</td>
                                    <td><input type="number" id="conf-birth-comp" value="${
                                      conf.birth.comp * 100
                                    }" style="width:60px; text-align:center;"> %</td>
                                    <td style="color:#999; font-size:12px;">个人无需缴纳</td>
                                </tr>
                                <tr style="background-color:#e6f7ff;">
                                    <td>住房公积金</td>
                                    <td><input type="number" id="conf-fund-pers" value="${
                                      conf.fund.pers * 100
                                    }" style="width:60px; text-align:center; font-weight:bold;"> %</td>
                                    <td><input type="number" id="conf-fund-comp" value="${
                                      conf.fund.comp * 100
                                    }" style="width:60px; text-align:center; font-weight:bold;"> %</td>
                                    <td style="color:#1890ff; font-size:12px;">独立基数</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px; color:#2980b9;">2. 缴纳基数范围 (上下限)</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom:30px;">
                            <div style="background:#f9f9f9; padding:15px; border-radius:4px;">
                                <h4 style="margin-top:0;">🅰️ 社保基数 (Social Security)</h4>
                                <div style="margin-bottom:10px;">
                                    <label>下限 (Floor):</label>
                                    <input type="number" id="conf-ss-min" value="${
                                      conf.limits.min
                                    }" style="width:100px; padding:5px;">
                                </div>
                                <div>
                                    <label>上限 (Ceiling):</label>
                                    <input type="number" id="conf-ss-max" value="${
                                      conf.limits.max
                                    }" style="width:100px; padding:5px;">
                                </div>
                            </div>
                            <div style="background:#e6f7ff; padding:15px; border-radius:4px;">
                                <h4 style="margin-top:0; color:#0050b3;">🅱️ 公积金基数 (Provident Fund)</h4>
                                <div style="margin-bottom:10px;">
                                    <label>下限 (Floor):</label>
                                    <input type="number" id="conf-fund-min" value="${
                                      conf.fundLimits
                                        ? conf.fundLimits.min
                                        : 2490
                                    }" style="width:100px; padding:5px;">
                                </div>
                                <div>
                                    <label>上限 (Ceiling):</label>
                                    <input type="number" id="conf-fund-max" value="${
                                      conf.fundLimits
                                        ? conf.fundLimits.max
                                        : 36549
                                    }" style="width:100px; padding:5px;">
                                </div>
                            </div>
                        </div>
                        
                        <h3 style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px; color:#2980b9;">3. 个税计算规则</h3>
                        <div style="margin-top:30px; text-align:center;">
                            <button class="btn-primary" style="background-color: #27ae60; padding: 10px 40px; font-size:16px;" onclick="saveHRConfig()">💾 保存配置</button>
                        </div>
                    </div>
                `;
  }

  // =========================================================================
  // 50-B. 员工档案编辑页 (HREmployeeEdit) - [新增：表单式编辑]
  // =========================================================================
  else if (moduleCode === "HREmployeeEdit") {
    const emp = window.g_currentEmployee || {};

    contentHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <h2>编辑员工档案：<span style="color:#2980b9;">${
                          emp.name
                        }</span></h2>
                        <button class="btn-primary" style="background-color: #95a5a6;" onclick="loadContent('HREmployee')"> < 返回列表</button>
                    </div>

                    <div style="background:white; padding:30px; border-radius:8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); max-width: 800px; margin: 0 auto;">
                        
                        <h3 style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px; color:#555;">👤 基础信息</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">工号 (不可改)</label>
                                <input type="text" id="emp-id" value="${
                                  emp.id
                                }" disabled style="width:100%; padding:8px; background:#f5f5f5; border:1px solid #ddd;">
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">姓名</label>
                                <input type="text" id="emp-name" value="${
                                  emp.name
                                }" style="width:100%; padding:8px; border:1px solid #ccc;">
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">部门</label>
                                <input type="text" id="emp-dept" value="${
                                  emp.dept
                                }" style="width:100%; padding:8px; border:1px solid #ccc;">
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">职位</label>
                                <input type="text" id="emp-pos" value="${
                                  emp.position
                                }" style="width:100%; padding:8px; border:1px solid #ccc;">
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">入职日期</label>
                                <input type="date" value="${
                                  emp.joinDate || ""
                                }" disabled style="width:100%; padding:8px; background:#f5f5f5; border:1px solid #ddd;">
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">在职状态</label>
                                <select id="emp-status" style="width:100%; padding:8px; border:1px solid #ccc;">
                                    <option value="在职" ${
                                      emp.status === "在职" ? "selected" : ""
                                    }>在职</option>
                                    <option value="离职" ${
                                      emp.status === "离职" ? "selected" : ""
                                    }>离职</option>
                                    <option value="休假" ${
                                      emp.status === "休假" ? "selected" : ""
                                    }>休假</option>
                                </select>
                            </div>
                        </div>

                        <h3 style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px; color:#555;">💰 财务与薪酬 (敏感信息)</h3>
                        <div style="margin-bottom: 20px;">
                            <label style="display:block; color:#666; margin-bottom:5px;">银行卡号 (发薪/报销用)</label>
                            <input type="text" id="emp-bank" value="${
                              emp.bankAccount
                            }" style="width:100%; padding:8px; border:1px solid #ccc; background:#fffbe6;">
                        </div>

                        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">基本工资 (固定)</label>
                                <input type="number" id="emp-salary-base" value="${
                                  emp.salaryBase
                                }" style="width:100%; padding:8px; border:1px solid #ccc; font-weight:bold;">
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">绩效基数 (浮动满分值)</label>
                                <input type="number" id="emp-salary-perf" value="${
                                  emp.salaryPerformance
                                }" style="width:100%; padding:8px; border:1px solid #ccc;">
                                <div style="font-size:12px; color:#999; margin-top:3px;">* 实发 = 基数 × 考核系数</div>
                            </div>
                            <div>
                                <label style="display:block; color:#666; margin-bottom:5px;">社保缴纳基数</label>
                                <input type="number" id="emp-ss-base" value="${
                                  emp.socialSecurityBase
                                }" style="width:100%; padding:8px; border:1px solid #ccc;">
                            </div>

                            <div>
                                <label style="display:block; color:#2980b9; font-weight:bold; margin-bottom:5px;">公积金基数</label>
                                <input type="number" id="emp-fund-base" value="${
                                  emp.providentFundBase !== undefined
                                    ? emp.providentFundBase
                                    : emp.socialSecurityBase
                                }" style="width:100%; padding:8px; border:1px solid #2980b9; background:#e6f7ff;">
                                <div style="font-size:12px; color:#999; margin-top:3px;">* 可与社保基数不同</div>
                            </div>
                        </div>
                        <div style="margin-top: 40px; text-align: right; padding-top: 20px; border-top: 1px solid #eee;">
                            <button class="btn-primary" style="background-color: #e74c3c; float:left;" onclick="alert('删除功能暂略')">删除档案</button>
                            <button class="btn-primary" style="background-color: #95a5a6; margin-right:10px;" onclick="loadContent('HREmployee')">取消</button>
                            <button class="btn-primary" style="background-color: #27ae60; padding: 8px 30px;" onclick="saveEmployeeDetail()">💾 保存更改</button>
                        </div>
                    </div>
                `;
  }

  // =========================================================================
  // 54. 绩效考核 (HRPerformance) - [新增]
  // =========================================================================
  else if (moduleCode === "HRPerformance") {
    // 动态加载数据行
    const rows =
      typeof window.loadPerformanceData === "function"
        ? window.loadPerformanceData()
        : '<tr><td colspan="7">加载中...</td></tr>';

    contentHTML += `
                    <h2>绩效考核 📊</h2>
                    <p style="color: #7f8c8d;">录入员工月度考核分数。该分数将直接决定工资中的“绩效工资”实发金额。</p>

                    <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px; border-radius:6px;">
                        <div style="display:flex; align-items:center; gap:15px;">
                            <span style="font-weight:bold;">考核月份：</span>
                            <select id="kpi-month" style="padding:8px; border:1px solid #ccc; border-radius:4px;">
                                <option value="2025-11">2025年11月</option>
                                <option value="2025-10">2025年10月</option>
                            </select>
                            <button class="btn-primary" onclick="loadContent('HRPerformance')">刷新列表</button>
                        </div>
                    </div>

                    <div class="action-bar" style="margin-bottom: 15px; text-align:right;">
                         <button class="btn-primary" style="background-color: #f39c12;">导入 Excel 评分</button>
                         <button class="btn-primary" style="background-color: #27ae60; padding: 8px 30px;" onclick="savePerformance()">💾 保存考核结果</button>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>工号</th>
                                <th>姓名</th>
                                <th>部门</th>
                                <th>绩效基数 (RMB)</th>
                                <th style="width:100px;">本月得分</th>
                                <th>折算系数</th>
                                <th>实发绩效 (预览)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    
                    <p style="font-size:12px; color:#999; margin-top:10px;">
                        * 说明：100分为标准系数1.0；低于100分按比例扣减；高于100分按 2% 累加奖励。
                    </p>
                `;
  }

  // =========================================================================
  // 55. 考勤管理 (HRAttendance) - [新增]
  // =========================================================================
  else if (moduleCode === "HRAttendance") {
    const rows =
      typeof window.loadAttendanceData === "function"
        ? window.loadAttendanceData()
        : "";

    contentHTML += `
                    <h2>考勤管理 📅</h2>
                    <p style="color: #7f8c8d;">录入员工月度请假和加班情况。事假/病假将扣款，加班将增加工资。</p>

                    <div class="filter-area" style="background:white; padding:15px; margin-bottom:20px; border-radius:6px;">
                        <div style="display:flex; align-items:center; gap:15px;">
                            <span style="font-weight:bold;">考勤月份：</span>
                            <select id="att-month" style="padding:8px; border:1px solid #ccc; border-radius:4px;">
                                <option value="2025-11">2025年11月</option>
                                <option value="2025-10">2025年10月</option>
                            </select>
                            <button class="btn-primary" onclick="loadContent('HRAttendance')">刷新列表</button>
                        </div>
                    </div>

            
            <div class="action-bar" style="margin-bottom: 15px; text-align:right;">
                 <button class="btn-primary" style="background-color: #3498db;" onclick="importDingTalkData()">📂 导入钉钉考勤 Excel</button>
                 <button class="btn-primary" style="background-color: #27ae60; padding: 8px 30px;" onclick="saveAttendance()">💾 保存考勤记录</button>
            </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>工号</th>
                                <th>姓名</th>
                                <th>部门</th>
                                <th style="background:#fff1f0; color:#c0392b;">事假 (天)</th>
                                <th style="background:#fff7e6; color:#d46b08;">病假 (天)</th>
                                <th style="background:#f6ffed; color:#389e0d;">加班 (小时)</th>
                                <th>备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    
                    <p style="font-size:12px; color:#999; margin-top:10px;">
                        * 规则说明：月计薪天数按 21.75天 计算。<br>
                        * 事假扣除：日工资 × 天数；病假扣除：日工资 × 40% × 天数；加班费：时薪 × 1.5 × 小时数。
                    </p>
                `;
  }

  // =========================================================================
  // 90. 客户档案 (BaseCustomer) - [支持新增字段 & 数据持久化]
  // =========================================================================
  else if (moduleCode === "BaseCustomer") {
    // 1. 定义默认数据 (写死在代码里的老数据)
    const defaultCustomers = [
      {
        id: "CUST-8812",
        name: "张三 (个人)",
        taxId: "-",
        type: "现结",
        limit: "0.00",
        days: "0",
        status: "正常",
      },
      {
        id: "CUST-9001",
        name: "风险贸易商贸",
        taxId: "91310000MA3...",
        type: "月结",
        limit: "50,000.00",
        days: "60",
        status: "已冻结",
      },
    ];

    // 2. 读取新增数据 (从 SessionStorage 读取刚才添加的)
    const addedCustomers = JSON.parse(
      sessionStorage.getItem("AddedCustomers") || "[]"
    );

    // 3. 合并数据 (新数据排在前面)
    const allCustomers = [...addedCustomers, ...defaultCustomers];

    // 4. 动态生成表格 HTML
    const rowsHTML = allCustomers
      .map((c) => {
        // 样式处理
        const typeBadge =
          c.type === "现结"
            ? '<span style="background:#f6ffed; color:#52c41a; padding:2px 6px; border-radius:4px; font-size:12px;">现结</span>'
            : '<span style="background:#e6f7ff; color:#1890ff; padding:2px 6px; border-radius:4px; font-size:12px;">月结</span>';

        const statusHtml =
          c.status === "正常"
            ? '<span style="color: #27ae60;">正常</span>'
            : '<span style="color: #e74c3c; font-weight:bold;">已冻结</span>';

        const rowStyle =
          c.status === "已冻结" ? "background-color: #fff1f0;" : "";

        // 冻结按钮逻辑
        const freezeAction =
          c.status === "正常"
            ? `<a href="javascript:void(0)" onclick="toggleFreeze(this, '${c.id}', '${c.name}')" style="color:#e74c3c;">冻结</a>`
            : `<a href="javascript:void(0)" onclick="toggleFreeze(this, '${c.id}', '${c.name}')" style="color:#3498db;">申请解冻</a>`;

        return `
                        <tr style="${rowStyle}">
                            <td>${c.id}</td>
                            <td class="val-name">${c.name}</td>
                            <td>${c.taxId}</td>
                            <td>${typeBadge}</td>
                            <td><strong>${c.limit}</strong></td>
                            <td>${c.days}</td>
                            <td>${statusHtml}</td>
                            <td>
                                <a href="javascript:void(0)" onclick="editCustomerInfo(this, '${c.id}')" style="color:#3498db;">修改资料</a> | 
                                ${freezeAction}
                            </td>
                        </tr>
                    `;
      })
      .join("");

    contentHTML += `
                    <h2>客户档案 </h2>
                    <p style="color: #7f8c8d;">管理客户的财务基础信息（开票信息、银行账户）及信用控制策略。</p>
                    
                    <div class="filter-area" style="background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <input type="text" placeholder="客户编码 / 名称" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
                            <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="">客户类别</option>
                                <option>企业客户</option>
                            </select>
                            <button class="btn-primary">查询</button>
                        </div>
                    </div>
                    
                    <div class="action-bar" style="margin-bottom: 15px;">
                        <button class="btn-primary" style="background-color: #27ae60;" onclick="addCustomer()">+ 新增客户</button>
                        <button class="btn-primary" style="background-color: #3498db;">同步 CRM 数据</button>
                        <button class="btn-primary" style="background-color: #f39c12;">批量设置额度</button>
                    </div>

                    <h3>客户列表</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>客户编码</th>
                                <th>客户名称</th>
                                <th>纳税人识别号</th>
                                <th>结算方式</th>
                                <th>信用额度 (RMB)</th>
                                <th>账期 (天)</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                `;
  } else {
    contentHTML += `<p>已切换到 **${getModuleName(moduleCode)}** 模块。</p>
                                <p>此处将加载该功能的详细操作界面，例如：</p>
                                <ul>
                                    <li>如果是 **报表**，则显示筛选条件和报表预览。</li>
                                    <li>如果是 **录入**，则显示数据表单。</li>
                                    <li>如果是 **查询**，则显示查询条件和数据列表。</li>
                                </ul>
                                <p style="color: #999;">（此为原型图模拟内容，请基于此结构进行后续的详细页面设计）</p>`;
  }

  // =========================================================================
  // 核心页面逻辑结束
  // =========================================================================

  contentArea.innerHTML = contentHTML;
}
