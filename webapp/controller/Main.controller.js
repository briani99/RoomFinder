sap.ui.define([
	"briani99/ui5/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("briani99.ui5.controller.Main", {


    	onInit: function () {
			// /this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		
		onListTilePressed : function(event) {
			this.getRouter().navTo("rooms");
		},
		
		onMapTilePressed : function(event) {
			this.getRouter().navTo("floor");
		}

	});

});