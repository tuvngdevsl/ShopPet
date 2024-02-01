import React from "react";
import { Modal } from "antd";

interface CustomModalProps {
  open: boolean;
  hideModal: () => void;
  performAction: () => void;
  title: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, hideModal, performAction, title }) => {
  return (
    <Modal
      title="Confirmation" // Consider using title={title} here if you want to display a dynamic title
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel" // Fix the typo in the property name
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
