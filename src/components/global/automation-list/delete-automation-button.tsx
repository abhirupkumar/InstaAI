import React from 'react'
import DeleteDialog from '../delete-dialog'
import { useEditAutomation } from '@/hooks/use-automations'

type Props = {
    id: string
}

const DeleteAutomationButton = (props: Props) => {
    const { deleteMutation } = useEditAutomation(props.id);
    return (
        <DeleteDialog onYes={() => {

            deleteMutation({ id: props.id })
        }} buttonText='Delete' dialogText='Are you Sure?' />
    )
}

export default DeleteAutomationButton
