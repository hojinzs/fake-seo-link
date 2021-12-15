import {Modal} from "@mui/material";
import {useState} from "react";

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
                const modalProps = modal.modalProps
                return (
                    <Modal key={modal.id}
                           open={isShowModal(modal.id)}
                           closeAfterTransition={true}
                           onClose={modalProps.onClose}
                    >
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

        const onClose = () => {
            modalControls.toggleOpenModal(id)
            setTimeout(() => {
                modalControls.unMountModal(id)
            }, 500)
        }

        const controls = {
            unMount: () => modalControls.unMountModal(id),
            toggleShow: () => modalControls.toggleOpenModal(id),
        }

        modalControls.setter([...modalControls.list, {
            id: id,
            component: component,
            modalProps: {
                onClose,
            },
            componentProps: {
                ...props,
                controls,
            },
        }])
        modalControls.toggleOpenModal(id)

        /* 컨트롤 반환 */
        return  controls
    },
    unMountModal: (id) => {
        modalControls.setter(modalControls.list.filter((item) => {
            return item.id !== id
        }))
    },
    toggleOpenModal: (id) => {
        if(modalControls.showList.includes(id)) {
            // modal Close
            modalControls.showListSetter(modalControls.showList.filter(showId => showId !== id))
        } else {
            // modal Open
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
