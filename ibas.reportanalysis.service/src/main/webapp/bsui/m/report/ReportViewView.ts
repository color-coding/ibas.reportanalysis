/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace m {
            /**
             * 视图-Report
             */
            export class ReportViewerView extends c.ReportViewView {
                draw(): any {
                    let page: any = super.draw();
                    if (page instanceof sap.m.Page) {
                        page.setShowFooter(false);
                    }
                    return page;
                }
                protected viewContent: ReportViewContent = new ReportViewContent(this, ibas.emChooseType.NONE);
            }
            /**
             * 视图-Report
             */
            export class ReportDataChooseView extends c.ReportDataChooseView {
                protected viewContent: ReportViewContent = new ReportViewContent(this, ibas.emChooseType.MULTIPLE);

                /** 获取选择的数据 */
                selectedDataTable(): ibas.DataTable {
                    if (this.viewContainer instanceof sap.m.Dialog) {
                        for (let item of this.viewContainer.getContent()) {
                            if (item instanceof sap.extension.m.List) {
                                let model: any = item.getModel()?.getData("rows");
                                if (model instanceof Array) {
                                    let indices: number[] = [];
                                    for (let selected of item.getSelecteds()) {
                                        let index: number = model.indexOf(selected);
                                        if (index >= 0) {
                                            indices.push(index);
                                        }
                                    }
                                    if (indices.length > 0) {
                                        return this.viewData.clone(indices);
                                    }
                                }
                            }
                        }
                    }
                    return null;
                }
            }
        }
    }
}