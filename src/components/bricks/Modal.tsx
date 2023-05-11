import { useCallback, useEffect, useRef } from "react";
import PortalModal from "./PortalModal";
import { ModalPositionX, ModalPositionY } from "../../ts/interfaces";
import { VscChromeClose } from "react-icons/vsc";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import * as S from "./styles";

export interface ModalConfig {
  title: string;
  showHeader: boolean;
  positionX: ModalPositionX;
  positionY: ModalPositionY;
  padding: string;
  showOverlay: boolean;
}

interface Props {
  show: boolean;
  config: ModalConfig;
  setShow: (value: boolean) => void;
  children: JSX.Element | JSX.Element[];
}

const Modal = ({ children, show, setShow, config }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // handle what happens on click outside of modal
  const handleClickOutside = () => setShow(false);

  // handle what happens on key press
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setShow(false);
  }, []);

  useOnClickOutside(modalRef, handleClickOutside);

  useEffect(() => {
    if (show) {
      // attach the event listener if the modal is shown
      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [handleKeyPress, show]);

  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  return (
    <>
      {show && (
        <PortalModal wrapperId="modal-portal">
          <S.Overlay
            showOverlay={config.showOverlay}
            positionX={config.positionX}
            positionY={config.positionY}
            show={show}
            style={{
              animationDuration: "400ms",
              animationDelay: "0",
            }}
          >
            <S.ModalContainer padding={config.padding} ref={modalRef}>
              {config.showHeader && (
                <S.ModalHeader>
                  <h3>{config.title}</h3>
                  <S.Action onClick={() => setShow(false)}>
                    <VscChromeClose />
                  </S.Action>
                </S.ModalHeader>
              )}
              <S.Content>{children}</S.Content>
            </S.ModalContainer>
          </S.Overlay>
        </PortalModal>
      )}
    </>
  );
};

export default Modal;
