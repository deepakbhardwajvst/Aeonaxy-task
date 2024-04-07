import React from 'react'
import LoadingIcon from "../../assets/loading.svg";
export default function Loader() {
    return (
        <div className="h-screen w-full fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">

            <object type="image/svg+xml" data={LoadingIcon} className="w-24 h-24">
                Your browser does not support SVG
            </object>

        </div>
    )
}
