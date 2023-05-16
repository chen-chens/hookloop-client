import React, { useState } from "react";
import { Layout } from "antd";

// component
import CustSider from "@/components/Layout/CustSider";
import CustContent from "./CustContent";

const Dashboard = () => {
  // 控制 Sider 收合的開關
  const [s_collapsed, set_s_collapsed] = useState(false);

  return (
    <Layout className="h-[calc(100vh_-_80px)] bg-white p-0">
      {/* Sider */}
      <CustSider s_collapsed={s_collapsed} set_s_collapsed={set_s_collapsed} />

      {/* content */}
      <Layout.Content className="px-[25px] py-[30px] relative overflow-auto">
        <CustContent s_collapsed={s_collapsed} set_s_collapsed={set_s_collapsed} />
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
