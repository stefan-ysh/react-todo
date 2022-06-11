import { Modal, Form, Input, DatePicker, message } from "antd";
import { useState } from "react";
import { uuid } from "../../../../utils";
import moment from "moment";
import type { RangePickerProps } from "antd/es/date-picker";
function AddModal(props: any) {
  // useEffect(() => {
  //   (document.getElementById("task-title") as any).onfocus();
  // }, []);
  const [title, setTaskTitle] = useState("");
  const [planStartTime, setPlanStartTime] = useState("");
  const [planEndTime, setPlanEndTime] = useState("");
  const [description, setDescription] = useState("");
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    // return current && current < moment().endOf("day");
    // Can not select days before today
    return current <= moment().startOf("day");
  };
  const submit = () => {
    if (!title) {
      return message.warning("You should input the task title");
    }
    if (!planStartTime) {
      return message.warning("You should input the task plan start time");
    }
    if (!planEndTime) {
      return message.warning("You should input the task plan end time");
    }
    props.handleCreateTask({
      title,
      id: uuid(),
      planEndTime,
      planStartTime,
      endTime: null,
      startTime: null,
      status: "todo",
      description,
      createdTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    message.success("add task successfully");
  };
  return (
    <Modal
      title="Create A New Task"
      centered
      visible={true}
      onOk={() => submit()}
      onCancel={() => props.setVisible(false)}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Task Title："
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            id="teak-title"
            placeholder="input a task title"
            // onPressEnter={props.handleCreateTask}
            onChange={(e) => setTaskTitle(e.target.value)}
            value={title}
          />
        </Form.Item>

        <Form.Item
          label="plan start time"
          name="taskPlanStart"
          rules={[{ required: true, message: "Please input the plan time!" }]}
        >
          <DatePicker
            disabledDate={disabledDate}
            placeholder="select plan start time"
            style={{ width: "100%" }}
            value={moment(planStartTime, "YYYY-MM-DD")}
            onChange={(date, string) => {
              setPlanStartTime(string);
            }}
            placement="bottomLeft"
          />
        </Form.Item>
        <Form.Item
          label="plan end time"
          name="taskPlanEnd"
          rules={[
            { required: true, message: "Please input the plan end time!" },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            placeholder="select plan end time"
            style={{ width: "100%" }}
            value={moment(planStartTime, "YYYY-MM-DD")}
            onChange={(date, string) => {
              setPlanEndTime(string);
            }}
            placement="bottomLeft"
          />
        </Form.Item>
        <Form.Item label="Description：" name="description">
          <Input.TextArea
            id="teak-description"
            placeholder="task description"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddModal;
