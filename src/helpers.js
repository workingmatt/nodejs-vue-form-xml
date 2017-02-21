//helpers.js
var xmlBuilder = require('xmlbuilder');
var fs = require('fs');

module.exports={

sendFileList: function(res){
	var path = "../xmlfiles";
	fs.readdir(path,'utf8',function(err,files){
		if(err){
			console.log("getFileList Error:");
			console.log(err);
			return err;
		}else{
			console.log('Sending file list');
			res.send(files);
			return;
		}
	});
},

writeXmlFile: function(xmlString,filename) {
	console.log('adding xmlfiles/'+filename);
	fs.writeFile(filename, xmlString, {flag:'wx'}, function (err){
		if(err) {
			if(err.code='EEXIST'){
				console.log('file ex');
			} else {
				console.log(err);
			}
		} else {
		console.log('File Successfully written: '+filename);
		}
	});
	return;
},

processJsonToAveriti: function(objJson) {
	var _objAdjFrom = JSON.parse(objJson.AdjacentFrom);
	var _objAdjTo = JSON.parse(objJson.AdjacentTo);
	var _objMadeOf = JSON.parse(objJson.MadeOf);
	var _objPartOf = JSON.parse(objJson.PartOf);

	var _xmlSubsystem = xmlBuilder.create('subsystem')
		.ele('platform_name',objJson.Platform).up()
		.ele('subsystem_name',objJson.Subsystem).up()
		.ele('category',objJson.Category).up()
		.ele('functional_area',objJson.FunctionalArea).up()
		.ele('layer_physical',objJson.LayerPhysical).up()
		.ele('layer_application',objJson.LayerApplication).up()
		.ele('layer_integration',objJson.LayerIntegration).up();

	for (item in _objMadeOf){
		_xmlSubsystem.ele('made_of').txt(_objMadeOf[item]);
	}

	for (item in _objPartOf){
		_xmlSubsystem.ele('part_of').txt(_objPartOf[item]);
	}

	for (item in _objAdjFrom){
		_xmlSubsystem.ele('adjacent_from').txt(_objAdjFrom[item]);
		//_tmpXml = xmlBuilder.create('adjacent_from').txt(_objAdjFrom[item]);
		//_xmlSubsystem.importDocument(_tmpXml);
	}

	for (item in _objAdjTo){
		var _xmlChildAdjTo = _xmlSubsystem.ele('adjacent_to');
		_xmlChildAdjTo.ele('adjacent_to_name').txt(_objAdjTo[item].name);
		_xmlChildAdjTo.ele('adjacent_to_function').txt(_objAdjTo[item].function);
	}

	var xmlString = _xmlSubsystem.end({pretty: true});
	//TODO Write to platformName_subsystemName.xml
	return xmlString;
}


};