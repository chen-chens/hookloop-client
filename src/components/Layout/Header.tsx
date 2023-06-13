/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { Grid, Button, Switch, Breadcrumb } from "antd";
import { MenuOutlined, CloseOutlined, NotificationOutlined } from "@ant-design/icons";
// logo
import logo_white from "@/assets/logo_white.svg";
import logo_black from "@/assets/logo_black.svg";
// context
import GlobalContext from "@/Context/GlobalContext";
// init value
import { kanbanInitValue, workspaceInitValue } from "@/components/util/initValue";
// component
import Notification from "@/components/Notification";
import Login from "../Login";
import CustAvatar from "../util/CustAvatar";

const Header: React.FC = () => {
  const { c_user, c_workspaces } = useContext(GlobalContext);
  const router = useRouter();
  // 判斷是否有權限
  const hasAuth = c_user?.email?.length > 0;
  // antd 用來監聽畫面寬度變化的 API
  const screens = Grid.useBreakpoint();
  // rwd 時控制要不要出現選單
  const [s_showMenu, set_s_showMenu] = useState(false);
  // 控制要不要顯示 Login 組件
  const [s_showLogin, set_s_showLogin] = useState(false);
  const [s_Breadcrumbs, set_s_Breadcrumbs] = useState<any[]>([]);

  // Header 上按鈕的基礎樣式
  const BTN_STYLE = "h-[32px] w-[105px] font-bold";

  // 關閉 Login 組件時執行
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };
  // click 漢堡選單的事件
  const toggle = (): void => {
    set_s_showMenu(!s_showMenu);
  };

  useEffect(() => {
    if (!router.query.id || !c_workspaces) {
      set_s_Breadcrumbs([]);
      return;
    }
    if (!c_workspaces) return;
    // 目標看板
    const kanbanData: Ikanban =
      c_workspaces?.flatMap((workspace) => workspace.kanbans)?.find((kanban) => kanban.key === router.query.id) ||
      kanbanInitValue;
    // workspace資料
    const workspaceData: Iworkspace =
      c_workspaces.find((workspace) => workspace.workspaceId === kanbanData?.workspaceId) || workspaceInitValue;
    set_s_Breadcrumbs([{ title: workspaceData.workspaceName }, { title: kanbanData.name }]);
  }, [router.query, c_workspaces]);

  // 螢幕變成md以上的尺寸時替使用者關閉漢堡選單
  useEffect(() => {
    if (screens.md && s_showMenu) {
      set_s_showMenu(false);
    }
  }, [screens]);

  // 切換 px-[25px] 跟 mx-[25px] 是要符合設計師版型
  return (
    <header
      className={`
      box-border flex h-[80px] 
      items-center justify-between border-b-[1px]
      ${hasAuth ? "bg-[#262626] px-[25px]" : "mx-[25px] bg-white"}
    `}
    >
      <div className="flex items-center gap-2">
        <Image
          src={hasAuth ? logo_white : logo_black}
          alt="HOOK LOOP"
          className="cursor-pointer"
          onClick={() => Router.push("/dashboard")}
        />

        {s_Breadcrumbs.length > 0 && <Breadcrumb items={s_Breadcrumbs} />}
      </div>

      {hasAuth ? (
        <div className="flex items-center gap-[24px]">
          <Switch className="h-[22px] w-[42px] bg-[#434343]" />
          <Notification />

          {/* <Avatar
            size={28}
            // src={c_user.avatar.length > 0 && c_user.avatar}
            src={c_user.avatar.length > 0 && `https://cdn.filestackcontent.com/${c_user.avatar}`}
            className="cursor-pointer bg-white text-black"
          >
            {c_user?.avatar.length === 0 ? c_user.username[0] : null}
          </Avatar> */}
          <CustAvatar info={c_user} onClick={() => Router.push("/profile")} />
        </div>
      ) : (
        <>
          {/* 大尺寸螢幕使用的 menu */}
          <div className="hidden gap-[24px] md:flex">
            <Button className={`${BTN_STYLE} text-black`} onClick={() => set_s_showLogin(true)}>
              Log in
            </Button>
            <Button type="primary" className={BTN_STYLE}>
              Get Start
            </Button>
          </div>

          {/* 漢堡選單 */}
          <div className="md:hidden">
            {s_showMenu ? (
              <CloseOutlined onClick={toggle} className="cursor-pointer text-[28px]" />
            ) : (
              <MenuOutlined onClick={toggle} className="cursor-pointer text-[28px]" />
            )}
          </div>

          {/* 小尺寸螢幕使用的 menu */}
          <section
            className={`${
              s_showMenu ? "visibile bg-opacity-20" : "invisible bg-opacity-0"
            } fixed left-0 right-0 top-[80px] h-screen bg-[#262626] transition-all`}
          >
            <div
              className={`flex items-center justify-end gap-[24px] overflow-hidden bg-white pr-[24px] transition-all ${
                s_showMenu ? "h-[80px]" : "h-[0px]"
              }`}
            >
              <Button className={`${BTN_STYLE} text-black`} onClick={() => set_s_showLogin(true)}>
                Log in
              </Button>
              <Button type="primary" className={BTN_STYLE}>
                Get Start
              </Button>
            </div>
          </section>
        </>
      )}

      {/* 登入的彈窗 */}
      <Login open={s_showLogin} close={closeLogin} />
    </header>
  );
};

export default Header;
