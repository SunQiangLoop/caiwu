# 财务—人事模块



HR_Finance/
│
├── index.html              # 入口页面 (只保留壳子：菜单+内容容器)
├── css/
│   └──  main.css            # 全局通用样式 (布局、按钮、表格)
│
└── js/
    ├── app.js              # 启动入口 (window.onload, 路由分发)
    ├── utils.js            # 工具库 (格式化金额, 生成ID, 日志记录 addAuditLog)
    │
    ├── core/               # ★ 核心引擎层
    │   ├── accounting_engine.js  # 会计引擎 (runAccountingEngine, 模板配置)
    │   └── view_manager.js     # ★★★ [视图核心]
    │
    ├── modules/            # ★ 业务模块层 (按文件夹拆分)
    │   ├── finance/        # 财务模块
    │   │   ├── voucher.js        # 凭证录入/审核/查询
    │   │   ├── ledger.js         # 账簿 (科目汇总/明细)
    │   │   ├── report.js         # 报表 (三大表)
    │   │   ├── settlement.js     # 结算 (运单/对账)
    │   │   ├── treasury.js       # 资金 (收款/付款/核销)
    │   │   └── invoice.js        # 发票 (进项/销项)
    │   │
    │   ├── asset/          # ★ 固定资产模块 (您现在要重点做的)
    │   │   ├── asset_card.js     # 卡片管理 (新增/变动)
    │   │   └── asset_depr.js     # 折旧/摊销计算 (核心算法)
    │   │
    │   └── hr/             # ★ 人事模块 (新增)
    │       ├── employee.js       # 员工档案
    │       └── salary.js         # 薪酬计算与发放
    │
    └── data/               # 模拟数据 (可选，用于存放初始化的JSON)



















