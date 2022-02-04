import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUser } from '../../contexts/user/useUser'
import styles from './styles/changeProfileImage.module.scss'

export const ChangeProfileImage = ({ close }) => {
    const { user } = useUser()
    const [imageDropped, setImageDropped] = useState(null)
    const onDrop = useCallback(acceptedFiles => {
        let imageUrl
        acceptedFiles.map(file => {
            imageUrl = Object.assign(file, {
                preview: URL.createObjectURL(file),
            })

            setImageDropped(imageUrl)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop,
    })

    return (
        <div className={styles.changeProfileImageContainer}>
            <div className={styles.closeContainer}>
                <i onClick={() => close(c => !c)}>X</i>
            </div>
            <div className={styles.dropZone} {...getRootProps()}>
                <input {...getInputProps()} />

                {!imageDropped ? (
                    <p>haz click o arrastra y suelta tu imagen aqui</p>
                ) : (
                    <img src={imageDropped.preview} alt="profile" />
                )}
            </div>
            <div className={styles.avatarsContainer}>
                <h3>tambien puedes elegir un avatar</h3>
                <div className={styles.avatar}></div>
            </div>
        </div>
    )
}
