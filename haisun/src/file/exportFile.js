import FileSaver from "file-saver";
export default class fileSave {
    /**
     * 导出Excel文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
    static getExcel(res, name) {
        let blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        FileSaver.saveAs(blob, name + ".xlsx");
    }
    
     /**
     * 导出doc文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
    static getdoc(res, name) {
        // let blob = new Blob([res],{
        //     type: "text/plain;charset=utf-8"
        // });
        // FileSaver.saveAs(blob, name + ".docx");
        let last = res.substring(res.lastIndexOf("."), res.length);
        FileSaver.saveAs(res, `${res}${last}`);
    }
    
    /**
     * 导出CSV文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
    static getCsv(res, name) {
        let blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        FileSaver.saveAs(blob, name + ".csv");
    }

        /**
     * 导出MP4视频文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
    static getmp4(res, name) {
        console.log(res)
        let blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        FileSaver.saveAs(blob, name + ".mp4");
    }
 
 
    /**
     * 导出图片1
     * @param {*} url 图片地址
     * @param {*} name  文件名
     */
    static getImgURLs(url, name) {
        let last = url.substring(url.lastIndexOf("."), url.length);
        FileSaver.saveAs(url, `${name}${last}`);
    }
     /**
     * 导出图片2
     * @param {*} res 文件流
     * @param {*} name  文件名
     */
    static downLoadImg(res, filename) {
        let blob = new Blob([res], {
            type: "image/jpeg"
        });
        FileSaver.saveAs(blob, `${filename}.jpg`);
    }
}