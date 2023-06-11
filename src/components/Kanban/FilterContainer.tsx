import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { Checkbox, Row, Col, Typography, Divider, Select, Radio } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RadioChangeEvent } from "antd";
import IconRenderer from "@/components/util/IconRender";
import * as icons from "@ant-design/icons";
// init value
import { workspaceInitValue, kanbanInitValue } from "@/components/util/initValue";
import CustAvatar from "@/components/util/CustAvatar";

type FilterContainerProps = {
  s_kanbanId: string;
  c_query: any;
  set_c_query: ISetStateFunction<any>;
  c_Tags: ITag[];
};

const FilterContainer: React.FC<FilterContainerProps> = ({ s_kanbanId, c_Tags, c_query, set_c_query }) => {
  const { c_workspaces } = useContext(GlobalContext);

  const [s_members, set_s_members] = useState<Imember[]>([]);
  // console.log("c_Tags = ", c_Tags);
  const onChange = (values: CheckboxValueType[]) => {
    // console.log("val", value);
    set_c_query((prev: any) => ({
      ...prev,
      values,
    }));
  };
  const RadioOnChange = (value: RadioChangeEvent) => {
    set_c_query({
      ...c_query,
      member: value,
    });
  };

  useEffect(() => {
    if (!s_kanbanId) return;
    // 目標看板
    const kanbanData: Ikanban =
      c_workspaces.flatMap((workspace) => workspace.kanbans)?.find((kanban) => kanban._id === s_kanbanId) ||
      kanbanInitValue;
    const members: Imember[] =
      c_workspaces.find((workspace) => workspace.workspaceId === kanbanData?.workspaceId)?.members ||
      workspaceInitValue.members;
    if (!members) return;
    set_s_members(members);
  }, [c_workspaces, s_kanbanId]);

  return (
    <div className="flex flex-col">
      <Checkbox.Group style={{ width: "100%" }} value={c_query?.member || ""} onChange={onChange}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Typography.Title level={5}>Members</Typography.Title>
          </Col>
          {s_members &&
            s_members.map((user: Imember) => (
              <Col span={24} key={user.username}>
                <Checkbox value={user.userId} className="member-chackbox flex items-end">
                  <CustAvatar info={user} />
                  <span className="ml-2">{user.username}</span>
                </Checkbox>
              </Col>
            ))}
          <Divider className="my-2" />
          <Col span={24}>
            <Typography.Title level={5}>Tags</Typography.Title>
          </Col>

          {c_Tags?.map((tag: ITag) => (
            <Col span={24} key={tag._id}>
              <Checkbox value={tag._id} className="flex w-full items-end">
                <span className={`${tag.color} w-full rounded-[50px] px-2 py-1`}>
                  <IconRenderer iconName={tag.icon as keyof typeof icons} />
                  <span className="ml-2">{tag.name}</span>
                </span>
              </Checkbox>
            </Col>
          ))}

          <Col span={24}>
            <Divider className="my-2" />
          </Col>

          <Col span={12}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Typography.Title level={5}>Priority</Typography.Title>
              </Col>
              <Col span={24}>
                <Select
                  placeholder="priority"
                  className="w-full"
                  // value={s_cardData.priority}
                  options={[
                    { label: "Low", value: "Low" },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "High" },
                  ]}
                />
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Typography.Title level={5}>Status</Typography.Title>
              </Col>
              <Col span={24}>
                <Select
                  placeholder="Status"
                  className="w-full"
                  // value={s_cardData.priority}
                  options={[
                    { label: "Pending", value: "Pending" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Done", value: "Done" },
                  ]}
                />
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Divider className="my-2" />
          </Col>

          <Col span={24}>
            <Typography.Title level={5}>Match</Typography.Title>
          </Col>

          <Col span={24}>
            <Radio.Group onChange={RadioOnChange}>
              <Radio value="Partially">Partially</Radio>
              <Radio value="Fully">Fully</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </Checkbox.Group>
    </div>
  );
};

export default FilterContainer;