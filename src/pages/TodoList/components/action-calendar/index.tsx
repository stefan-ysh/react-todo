import { Drawer } from "antd";
import Calendar from "./components/calendar";

const ActionCalendar = (props: any) => {
  const onClose = () => {
    props.closeDrawer(false);
  };
  return (
    <Drawer
      title="ActionCalendar"
      placement="top"
      closable={false}
      onClose={onClose}
      visible={true}
      key="action-calendar"
    >
      <Calendar />
    </Drawer>
  );
};

export default ActionCalendar;
