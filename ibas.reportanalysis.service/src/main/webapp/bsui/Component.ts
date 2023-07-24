/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace reportanalysis {
    export namespace ui {
        export namespace component {
            sap.extension.m.ConversionText.extend("reportanalysis.ui.component.UserOrRoleText", {
                metadata: {
                    properties: {
                        typeProperty: { type: "string" },
                    },
                    events: {
                    },
                },
                renderer: {
                },
                getTypeProperty(this: UserOrRoleText): string {
                    return this.getProperty("typeProperty");
                },
                setTypeProperty(this: UserOrRoleText, value: string): UserOrRoleText {
                    return this.setProperty("typeProperty", value);
                },
                init(this: UserOrRoleText): void {
                    (<any>sap.extension.m.ConversionText.prototype).init.apply(this, arguments);
                    this.attachConvert(undefined, (event: sap.ui.base.Event) => {
                        let value: string = event.getParameter("value");
                        let done: (newValue: string) => void = event.getParameter("done");
                        let bindingData: any = event.getParameter("bindingData");
                        let type: bo.emAssignedType = bindingData[this.getTypeProperty()];
                        if (ibas.objects.isNull(type) || ibas.strings.isEmpty(value)) {
                            return;
                        }
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        for (let item of String(value).split(ibas.DATA_SEPARATOR)) {
                            if (ibas.strings.isEmpty(item)) {
                                continue;
                            }
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = "Code";
                            condition.value = item;
                            if (criteria.conditions.length > 0) {
                                condition.relationship = ibas.emConditionRelationship.OR;
                            }
                        }
                        let fetched: (values: ibas.IList<ibas.KeyText> | Error) => void = (values) => {
                            if (values instanceof Error) {
                                ibas.logger.log(values);
                            } else {
                                let keyBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                keyBudilder.map(null, "");
                                keyBudilder.map(undefined, "");
                                let textBudilder: ibas.StringBuilder = new ibas.StringBuilder();
                                textBudilder.map(null, "");
                                textBudilder.map(undefined, "");
                                for (let item of values) {
                                    if (keyBudilder.length > 0) {
                                        keyBudilder.append(ibas.DATA_SEPARATOR);
                                    }
                                    if (textBudilder.length > 0) {
                                        textBudilder.append(ibas.DATA_SEPARATOR);
                                        textBudilder.append(" ");
                                    }
                                    keyBudilder.append(item.key);
                                    textBudilder.append(item.text);
                                }
                                done(textBudilder.toString());
                            }
                        };
                        let boRepository: initialfantasy.bo.BORepositoryInitialFantasy = sap.extension.variables.get(UserOrRoleText, "repository");
                        if (ibas.objects.isNull(boRepository)) {
                            boRepository = new initialfantasy.bo.BORepositoryInitialFantasy();
                            sap.extension.variables.set(boRepository, UserOrRoleText, "repository");
                        }
                        if (type === bo.emAssignedType.USER) {
                            let userInfo: any = sap.extension.variables.get(UserOrRoleText, "userInfo");
                            if (ibas.objects.isNull(userInfo)) {
                                userInfo = {
                                    type: initialfantasy.bo.User,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(userInfo, UserOrRoleText, "userInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, userInfo, criteria, fetched);
                        } else if (type === bo.emAssignedType.ROLE) {
                            let roleInfo: any = sap.extension.variables.get(UserOrRoleText, "roleInfo");
                            if (ibas.objects.isNull(roleInfo)) {
                                roleInfo = {
                                    type: initialfantasy.bo.Organization,
                                    key: "Code",
                                    text: "Name"
                                };
                                sap.extension.variables.set(roleInfo, UserOrRoleText, "roleInfo");
                            }
                            sap.extension.repository.batchFetch(boRepository, roleInfo, criteria, fetched);
                        }
                    });
                }
            });
        }
    }
}