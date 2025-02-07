import { ReactNode } from "react";
import { Box, Modal } from "@mui/material";
import variables from "../../utilities/variables";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const style = variables.style;

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
