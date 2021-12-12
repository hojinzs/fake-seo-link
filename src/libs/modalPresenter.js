import {Modal} from "@mui/material";
import {useState} from "react";
import {PositionCentered} from "../components/styled/positions";

function ModalPresenter(){

    const [modalList, setModalList] = useState([])
    const [modalShowList, setModalShowList] = useState([])

    subscribeInsertModal(modalList, setModalList, modalShowList, setModalShowList)

    const isShowModal = (id) => {
        return modalShowList.includes(id)
    }

    function renderModals(){
        return (
            modalList.map((modal, i) => {
                const Component = modal.component
                return (
                    <Modal key={modal.id} open={isShowModal(modal.id)} {...modal.modalProps}>
                        <>
                            <Component {...modal.componentProps} />
                        </>
                    </Modal>
                )
            })
        )
    }

    return (
        <>
            { renderModals() }
        </>
    )

}

const modalControls = {
    list: [],
    setter: () => {},
    showList: [],
    showListSetter: () => {},
    mountModal: (component, props) => {

        const id = modalControls.list.length

        const onClose = () => modalControls.toggleOpenModal(id)

        modalControls.setter([...modalControls.list, {
            id: id,
            component: component,
            modalProps: {
                onClose
            },
            componentProps: {
                ...props,
            }
        }])
        modalControls.toggleOpenModal(id)

        /* 컨트롤 반환 */
        return  {
            unMount: () => modalControls.unMountModal(id),
            toggleShow: () => modalControls.toggleOpenModal(id)
        }
    },
    unMountModal: (id) => {
        modalControls.setter(modalControls.list.filter((item) => {
            return item.id !== id
        }))
    },
    toggleOpenModal: (id) => {
        if(modalControls.showList.includes(id)) {
            modalControls.showListSetter(modalControls.showList.filter(showId => showId !== id))
        } else {
            modalControls.showListSetter([...modalControls.showList, id])
        }
    }

}

const subscribeInsertModal = (modalList, setModalList, modalShowList, setModalShowList) => {
    modalControls.list = modalList
    modalControls.setter = setModalList
    modalControls.showList = modalShowList
    modalControls.showListSetter = setModalShowList
}

const modalController = modalControls.mountModal

export {
    ModalPresenter,
    modalController,
}
