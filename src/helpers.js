//helpers.js
var xmlBuilder = require('xmlbuilder');
var parseString = require('xml2js').parseString;
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
	fs.writeFile(filename, xmlString, {flag:'w'}, function (err){ //flag wx is no overwrite
		if(err) {
			if(err.code='EEXIST'){
				console.log('file exists');
			} else {
				console.log(err);
			}
		} else {
		console.log('File successfully written: '+filename);
		}
	});
	return;
},

deleteFile: function(filename,res){
	fs.unlink("../xmlfiles/"+filename, function(err){
		if(err){
			console.log(err);
			res.send("Delete Failed");
			return;
		}
		console.log("%s deleted",filename);
		res.send("Deleted "+filename);
	});
},

//Uses xmlbuilder: www.npmjs.com/package/xmlbuilder
processJsonToAveriti: function(objJson) {
	
	if (objJson.adjacent_from) {var _objadj_from = JSON.parse(objJson.adjacent_from);}
	else {var _objadj_from = '';}

	if (objJson.adjacent_to) {
		var _objadj_to = JSON.parse(objJson.adjacent_to);
	} else {
		var _objadj_to = [];
		_objadj_to[0] = {"adjacent_to_name":'',"adjacent_to_function":''};
		
	}

	if (objJson.MadeOf) {
		var _objmade_of = JSON.parse(objJson.MadeOf);
	} else {
		var _objmade_of = '';
	}

	console.log(objJson);
	if (objJson.part_of) {var _objpart_of = JSON.parse(objJson.part_of);}
	else {var _objpart_of = '';}

	var _xmlSubsystem = xmlBuilder.create('subsystem')
		.ele('platform_name',objJson.Platform).up()
		.ele('subsystem_name',objJson.Subsystem).up()
		.ele('category',objJson.Category).up()
		.ele('functional_area',objJson.FunctionalArea).up()
		.ele('layer_physical',objJson.LayerPhysical).up()
		.ele('layer_application',objJson.LayerApplication).up()
		.ele('layer_integration',objJson.LayerIntegration).up();

	for (item in _objmade_of){
		_xmlSubsystem.ele('made_of').txt(_objmade_of[item]);
	}

	for (item in _objpart_of){
		_xmlSubsystem.ele('part_of').txt(_objpart_of[item]);
	}

	for (item in _objadj_from){
		_xmlSubsystem.ele('adjacent_from').txt(_objadj_from[item]);
	}

	for (item in _objadj_to){
		var _xmlChildAdjTo = _xmlSubsystem.ele('adjacent_to');
		_xmlChildAdjTo.ele('adjacent_to_name').txt(_objadj_to[item].adjacent_to_name);
		_xmlChildAdjTo.ele('adjacent_to_function').txt(_objadj_to[item].adjacent_to_function);
	}
	_xmlSubsystem	.ele('version_number',objJson.version_number).up()
					.ele('functional_description',objJson.functional_description).up()
					.ele('associated_standards',objJson.associated_standards).up()
					.ele('interfaces',objJson.interfaces).up()
					.ele('capabilities_limitations',objJson.capabilities_limitations).up()
					.ele('observation_information',objJson.observation_information).up()
					.ele('program_replacement_date',objJson.program_replacement_date).up()
					.ele('program_component_obsolesence_date',objJson.program_component_obsolesence_date).up()
					.ele('program_cease_production_date',objJson.program_cease_production_date).up()
					.ele('manufacturer',objJson.manufacturer).up()
					.ele('id',objJson.id).up()
					.ele('references',objJson.references).up();

	var xmlString = _xmlSubsystem.end({pretty: true});
	return xmlString;
},

processAveritiToJson: function(filename, res){
	var _resp;
	console.log("In processAveritiToJson: "+filename);
	var _fileForConversion = fs.readFile(filename, 'utf8', function(err, data){
		if(err){
			throw err;
		}
		_resp = parseString(data, function(err, result){
			res.send(JSON.stringify(result));
			return;
		});

		});
}


};