import { Modal, Form, Input } from "antd";
// import { useEffect } from "react";
function AddModal(props: any) {
  // useEffect(() => {
  //   (document.getElementById("task-title") as any).onfocus();
  // }, []);

  return (
    <Modal
      title="Create A New Task"
      centered
      visible={true}
      onOk={props.handleCreateTask}
      onCancel={() => props.setVisible(false)}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Task Title："
          name="taskTitle"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            id="teak-title"
            onPressEnter={props.handleCreateTask}
            onChange={(e) => props.inputNewTaskTitle(e)}
            value={props.newTaskTitle}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddModal;
