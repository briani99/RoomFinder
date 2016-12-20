sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createRoomsModel: function() {
			var roomModel = new JSONModel();
			roomModel.loadData("/destinations/myrooms", "", false);
			roomModel.setDefaultBindingMode("OneWay");
			return roomModel;
		}

	};
});