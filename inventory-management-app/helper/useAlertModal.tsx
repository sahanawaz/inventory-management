import React, { useCallback, useState } from "react";
import { AlertModalConfig } from "../shared/SharedInterface";
import AlertModal from "../utils/AlertModal";

type ModalType = "SUC" | "ERR";
interface AlertModalParams {
  config: AlertModalConfig;
  onClose: () => void;
  onOk?: () => void;
}

const useAlertModal = () => {
  const [modalData, setModalData] = useState<AlertModalParams>({
    config: {
      visible: false,
      isSuccess: 1,
      message: [],
      iconSrc: "",
    },
    onClose: () => {},
  });

  const showModal = useCallback(
    (config: AlertModalConfig, callback?: () => void) => {
      setModalData({
        config,
        onOk: config.isSuccess === 0 ? callback : undefined,
        onClose: () =>
          setModalData((prev) => ({
            ...prev,
            config: { ...prev.config, visible: false },
          })),
      });
    },
    []
  );

  const hideModal = useCallback(() => {
    setModalData((prev) => ({
      ...prev,
      config: { ...prev.config, visible: false },
    }));
  }, []);

  const handleOk = useCallback(() => {
    modalData.onOk?.();
    hideModal();
  }, [modalData.onOk, hideModal]);

  const Modal = (
    <AlertModal
      config={modalData.config}
      onDismiss={modalData.onClose}
      onOk={handleOk}
    />
  );

  return {
    showModal,
    hideModal,
    Modal,
  };
};

export default useAlertModal;
