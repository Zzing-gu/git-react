import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import Axios from 'axios'

export default function MyDropzone() {


    const Filetest = async (acceptedFiles) => {
        console.log(acceptedFiles[0])
        var filename = acceptedFiles[0].name

        var formData  = new FormData();

        formData.append('name', acceptedFiles[0])

        var config = {
            // Accept: 'application/json, text/plain, */*',
            // 'content-type': '*/*',
            
            headers: {
                //ContentDisposition: `attachment; filename=${filename}`,
                'Content-Type': 'multipart/form-data',
                //'contenttype': '*/*',
                'Content-Disposition': `attachment; filename=${filename}`,
                
            }
        }



        await Axios.put(`http://127.0.0.1:8000/git/add/`, formData, config)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }



    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        Filetest(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }


            
        </div>
    )
}