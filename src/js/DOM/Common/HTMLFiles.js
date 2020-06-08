/*
* @id initHTMLFiles
*/
var initHTMLFiles = function(){

    var files = {};

    files["hc_staff.xml"]         = {"declaration":{"type":"DOCTYPE","doc_name":"html","system":"PUBLIC","dtd2":"xhtml1-strict.dtd","meta":"[\n   <!ENTITY alpha \"&#945;\">\n   <!ENTITY beta \"&#946;\">\n   <!ENTITY gamma \"&#947;\">\n   <!ENTITY delta \"&#948;\">\n   <!ENTITY epsilon \"&#949;\">\n   <!ENTITY alpha \"&#950;\">\n   <!NOTATION notation1 PUBLIC \"notation1File\">\n   <!NOTATION notation2 SYSTEM \"notation2File\">\n   <!ATTLIST acronym dir CDATA \"ltr\">\n]","entities":[{"ent_name":"alpha","public":false,"value":{"elements":[{"type":"text","text":"&#945;"}]},"ndata":false},{"ent_name":"beta","public":false,"value":{"elements":[{"type":"text","text":"&#946;"}]},"ndata":false},{"ent_name":"gamma","public":false,"value":{"elements":[{"type":"text","text":"&#947;"}]},"ndata":false},{"ent_name":"delta","public":false,"value":{"elements":[{"type":"text","text":"&#948;"}]},"ndata":false},{"ent_name":"epsilon","public":false,"value":{"elements":[{"type":"text","text":"&#949;"}]},"ndata":false},{"ent_name":"alpha","public":false,"value":{"elements":[{"type":"text","text":"&#950;"}]},"ndata":false}],"notations":[{"not_name":"notation1","visibility":"PUBLIC","value":"notation1File"},{"not_name":"notation2","visibility":"SYSTEM","value":"notation2File"}]},"elements":[{"type":"instruction","name":"TEST-STYLE","instruction":"PIDATA"},{"type":"doctype","doctype":"html \n  PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \n  \"xhtml1-strict.dtd\" [\n   <!ENTITY alpha \"&#945;\">\n   <!ENTITY beta \"&#946;\">\n   <!ENTITY gamma \"&#947;\">\n   <!ENTITY delta \"&#948;\">\n   <!ENTITY epsilon \"&#949;\">\n   <!ENTITY alpha \"&#950;\">\n   <!NOTATION notation1 PUBLIC \"notation1File\">\n   <!NOTATION notation2 SYSTEM \"notation2File\">\n   <!ATTLIST acronym dir CDATA \"ltr\">\n]"},{"type":"comment","comment":" This is comment number 1."},{"type":"element","name":"html","attributes":[{"name":"xmlns","value":"http://www.w3.org/1999/xhtml","elements":[]}],"elements":[{"type":"element","name":"head","elements":[{"type":"element","name":"meta","attributes":[{"name":"http-equiv","value":"Content-Type","elements":[]},{"name":"content","value":"text/html; charset=UTF-8","elements":[]}]},{"type":"element","name":"title","elements":[{"type":"text","text":"hc_staff"}]},{"type":"element","name":"script","attributes":[{"name":"type","value":"text/javascript","elements":[]},{"name":"src","value":"svgunit.js","elements":[]}]},{"type":"element","name":"script","attributes":[{"name":"charset","value":"UTF-8","elements":[]},{"name":"type","value":"text/javascript","elements":[]},{"name":"src","value":"svgtest.js","elements":[]}]},{"type":"element","name":"script","attributes":[{"name":"type","value":"text/javascript","elements":[]}],"elements":[{"type":"text","text":"function loadComplete() { startTest(); }"}]}]},{"type":"element","name":"body","attributes":[{"name":"onload","value":"parent.loadComplete()","elements":[]}],"elements":[{"type":"element","name":"p","elements":[{"type":"element","name":"em","elements":[{"type":"text","text":"EMP0001"}]},{"type":"element","name":"strong","elements":[{"type":"text","text":"Margaret Martin"}]},{"type":"element","name":"code","elements":[{"type":"text","text":"Accountant"}]},{"type":"element","name":"sup","elements":[{"type":"text","text":"56,000"}]},{"type":"element","name":"var","elements":[{"type":"text","text":"Female"}]},{"type":"element","name":"acronym","attributes":[{"name":"title","value":"Yes","elements":[]}],"elements":[{"type":"text","text":"1230 North Ave. Dallas, Texas 98551"}]}]},{"type":"element","name":"p","elements":[{"type":"element","name":"em","elements":[{"type":"text","text":"EMP0002"}]},{"type":"element","name":"strong","elements":[{"type":"text","text":"Martha RaynoldsThis is a CDATASection with EntityReference number 2 &ent2;\nThis is an adjacent CDATASection with a reference to a tab &tab;"}]},{"type":"element","name":"code","elements":[{"type":"text","text":"Secretary"}]},{"type":"element","name":"sup","elements":[{"type":"text","text":"35,000"}]},{"type":"element","name":"var","elements":[{"type":"text","text":"Female"}]},{"type":"element","name":"acronym","attributes":[{"name":"title","value":"Yes","elements":[]},{"name":"class","value":"Yes","elements":[]}],"elements":[{"type":"text","text":"&beta; Dallas, &gamma;\n 98554"}]}]},{"type":"element","name":"p","elements":[{"type":"element","name":"em","elements":[{"type":"text","text":"EMP0003"}]},{"type":"element","name":"strong","elements":[{"type":"text","text":"Roger\n Jones"}]},{"type":"element","name":"code","elements":[{"type":"text","text":"Department Manager"}]},{"type":"element","name":"sup","elements":[{"type":"text","text":"100,000"}]},{"type":"element","name":"var","elements":[{"type":"text","text":"&delta;"}]},{"type":"element","name":"acronym","attributes":[{"name":"title","value":"Yes","elements":[]},{"name":"class","value":"No","elements":[]}],"elements":[{"type":"text","text":"PO Box 27 Irving, texas 98553"}]}]},{"type":"element","name":"p","elements":[{"type":"element","name":"em","elements":[{"type":"text","text":"EMP0004"}]},{"type":"element","name":"strong","elements":[{"type":"text","text":"Jeny Oconnor"}]},{"type":"element","name":"code","elements":[{"type":"text","text":"Personnel Director"}]},{"type":"element","name":"sup","elements":[{"type":"text","text":"95,000"}]},{"type":"element","name":"var","elements":[{"type":"text","text":"Female"}]},{"type":"element","name":"acronym","attributes":[{"name":"title","value":"Yes","elements":[]},{"name":"class","value":"Y&alpha;","elements":[]}],"elements":[{"type":"text","text":"27 South Road. Dallas, Texas 98556"}]}]},{"type":"element","name":"p","elements":[{"type":"element","name":"em","elements":[{"type":"text","text":"EMP0005"}]},{"type":"element","name":"strong","elements":[{"type":"text","text":"Robert Myers"}]},{"type":"element","name":"code","elements":[{"type":"text","text":"Computer Specialist"}]},{"type":"element","name":"sup","elements":[{"type":"text","text":"90,000"}]},{"type":"element","name":"var","elements":[{"type":"text","text":"male"}]},{"type":"element","name":"acronym","attributes":[{"name":"title","value":"Yes","elements":[]}],"elements":[{"type":"text","text":"1821 Nordic. Road, Irving Texas 98558"}]}]}]}]}]}
    files["staff.xml"]            = 
    {
      "declaration": {
        "type": "DOCTYPE",
        "doc_name": "staff",
        "system": "SYSTEM",
        "dtd": [
          {
            "ent_name": "entElement",
            "attr_data": "attr1 CDATA \"Attr\"",
            "attributes": [
              {
                "attr_name": "attr1",
                "attr_type": "CDATA",
                "default": "Attr",
                "elem": "entElement"
              }
            ]
          },
          {
            "ent_name": "address",
            "attr_data": "domestic CDATA #IMPLIED \n          street CDATA \"Yes\"",
            "attributes": [
              {
                "attr_name": "domestic",
                "attr_type": "CDATA",
                "elem": "address"
              },
              {
                "attr_name": "street",
                "attr_type": "CDATA",
                "default": "Yes",
                "elem": "address"
              }
            ]
          },
          {
            "ent_name": "entElement",
            "attr_data": "domestic CDATA \"MALE\" ",
            "attributes": [
              {
                "attr_name": "domestic",
                "attr_type": "CDATA",
                "default": "MALE",
                "elem": "entElement"
              }
            ]
          }
        ],
        "meta": "[\n   <!ENTITY ent1 \"es\">\n   <!ENTITY ent2 \"1900 Dallas Road\">\n   <!ENTITY ent3 \"Texas\">\n   <!ENTITY ent4 \"<entElement domestic='Yes'>Element data</entElement><?PItarget PIdata?>\">\n   <!ENTITY ent5 PUBLIC \"entityURI\" \"entityFile\" NDATA notation1>\n   <!ENTITY ent1 \"This entity should be discarded\">\n   <!NOTATION notation1 PUBLIC \"notation1File\">\n   <!NOTATION notation2 SYSTEM \"notation2File\">\n]>\n<!-- This is comment number 1.-->\n<staff>\n <employee>\n  <employeeId>EMP0001</employeeId>\n  <name>Margaret Martin</name>\n  <position>Accountant</position>           \n  <salary>56,000</salary>\n  <gender>Female</gender>\n  <address domestic=\"Yes\">1230 North Ave. Dallas, Texas 98551</address>\n </employee>\n <employee>\n  <employeeId>EMP0002</employeeId>\n  <name>Martha Raynolds<![CDATA[This is a CDATASection with EntityReference number 2 &ent2;]]>\n<![CDATA[This is an adjacent CDATASection with a reference to a tab &tab;]]",
        "entities": [
          {
            "ent_name": "ent1",
            "public": false,
            "value": {
              "elements": [
                {
                  "type": "text",
                  "text": "es"
                }
              ]
            },
            "ndata": false
          },
          {
            "ent_name": "ent2",
            "public": false,
            "value": {
              "elements": [
                {
                  "type": "text",
                  "text": "1900 Dallas Road"
                }
              ]
            },
            "ndata": false
          },
          {
            "ent_name": "ent3",
            "public": false,
            "value": {
              "elements": [
                {
                  "type": "text",
                  "text": "Texas"
                }
              ]
            },
            "ndata": false
          },
          {
            "ent_name": "ent4",
            "public": false,
            "value": {
              "elements": [
                {
                  "type": "element",
                  "name": "entElement",
                  "attributes": [
                    {
                      "name": "domestic",
                      "value": "Yes"
                    }
                  ],
                  "elements": [
                    {
                      "type": "text",
                      "text": "Element data"
                    }
                  ]
                },
                {
                  "type": "instruction",
                  "name": "PItarget",
                  "instruction": "PIdata"
                }
              ]
            },
            "ndata": false
          },
          {
            "ent_name": "ent5",
            "public": true,
            "public_id": "entityURI",
            "value": {
              "elements": [
                {
                  "type": "text",
                  "text": "entityFile"
                }
              ]
            },
            "ndata": true,
            "link": "notation1",
            "systemId": "entityFile"
          },
          {
            "ent_name": "ent1",
            "public": false,
            "value": {
              "elements": [
                {
                  "type": "text",
                  "text": "This entity should be discarded"
                }
              ]
            },
            "ndata": false
          }
        ],
        "notations": [
          {
            "not_name": "notation1",
            "visibility": "PUBLIC",
            "value": "notation1File"
          },
          {
            "not_name": "notation2",
            "visibility": "SYSTEM",
            "value": "notation2File"
          }
        ]
      },
      "elements": [
        {
          "type": "instruction",
          "name": "TEST-STYLE",
          "instruction": "PIDATA"
        },
        {
          "type": "doctype",
          "doctype": "staff SYSTEM \"staff.dtd\" [\n   <!ENTITY ent1 \"es\">\n   <!ENTITY ent2 \"1900 Dallas Road\">\n   <!ENTITY ent3 \"Texas\">\n   <!ENTITY ent4 \"<entElement domestic='Yes'>Element data</entElement><?PItarget PIdata?>\">\n   <!ENTITY ent5 PUBLIC \"entityURI\" \"entityFile\" NDATA notation1>\n   <!ENTITY ent1 \"This entity should be discarded\">\n   <!NOTATION notation1 PUBLIC \"notation1File\">\n   <!NOTATION notation2 SYSTEM \"notation2File\">\n]"
        },
        {
          "type": "comment",
          "comment": " This is comment number 1."
        },
        {
          "type": "element",
          "name": "staff",
          "elements": [
            {
              "type": "element",
              "name": "employee",
              "elements": [
                {
                  "type": "element",
                  "name": "employeeId",
                  "elements": [
                    {
                      "type": "text",
                      "text": "EMP0001"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "name",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Margaret Martin"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "position",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Accountant"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "salary",
                  "elements": [
                    {
                      "type": "text",
                      "text": "56,000"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "gender",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Female"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "address",
                  "attributes": [
                    {
                      "name": "domestic",
                      "value": "Yes",
                      "elements": []
                    }
                  ],
                  "elements": [
                    {
                      "type": "text",
                      "text": "1230 North Ave. Dallas, Texas 98551"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "name": "employee",
              "elements": [
                {
                  "type": "element",
                  "name": "employeeId",
                  "elements": [
                    {
                      "type": "text",
                      "text": "EMP0002"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "name",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Martha Raynolds"
                    },
                    {
                      "type": "cdata",
                      "cdata": "This is a CDATASection with EntityReference number 2 &ent2;"
                    },
                    {
                      "type": "text",
                      "text": "\n"
                    },
                    {
                      "type": "cdata",
                      "cdata": "This is an adjacent CDATASection with a reference to a tab &tab;"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "position",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Secretary"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "salary",
                  "elements": [
                    {
                      "type": "text",
                      "text": "35,000"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "gender",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Female"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "address",
                  "attributes": [
                    {
                      "name": "domestic",
                      "value": "Yes",
                      "elements": []
                    },
                    {
                      "name": "street",
                      "value": "Yes",
                      "elements": []
                    }
                  ],
                  "elements": [
                    {
                      "type": "entityreference",
                      "name": "ent2"
                    },
                    {
                      "type": "text",
                      "text": " Dallas, "
                    },
                    {
                      "type": "entityreference",
                      "name": "ent3"
                    },
                    {
                      "type": "text",
                      "text": "\n 98554"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "name": "employee",
              "elements": [
                {
                  "type": "element",
                  "name": "employeeId",
                  "elements": [
                    {
                      "type": "text",
                      "text": "EMP0003"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "name",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Roger\n Jones"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "position",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Department Manager"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "salary",
                  "elements": [
                    {
                      "type": "text",
                      "text": "100,000"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "gender",
                  "elements": [
                    {
                      "type": "entityreference",
                      "name": "ent4"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "address",
                  "attributes": [
                    {
                      "name": "domestic",
                      "value": "Yes",
                      "elements": []
                    },
                    {
                      "name": "street",
                      "value": "No",
                      "elements": []
                    }
                  ],
                  "elements": [
                    {
                      "type": "text",
                      "text": "PO Box 27 Irving, texas 98553"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "name": "employee",
              "elements": [
                {
                  "type": "element",
                  "name": "employeeId",
                  "elements": [
                    {
                      "type": "text",
                      "text": "EMP0004"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "name",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Jeny Oconnor"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "position",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Personnel Director"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "salary",
                  "elements": [
                    {
                      "type": "text",
                      "text": "95,000"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "gender",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Female"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "address",
                  "attributes": [
                    {
                      "name": "domestic",
                      "value": "Yes",
                      "elements": []
                    },
                    {
                      "name": "street",
                      "value": "Y&ent1;",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Y"
                        },
                        {
                          "type": "entityreference",
                          "name": "ent1"
                        }
                      ]
                    }
                  ],
                  "elements": [
                    {
                      "type": "text",
                      "text": "27 South Road. Dallas, Texas 98556"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "name": "employee",
              "elements": [
                {
                  "type": "element",
                  "name": "employeeId",
                  "elements": [
                    {
                      "type": "text",
                      "text": "EMP0005"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "name",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Robert Myers"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "position",
                  "elements": [
                    {
                      "type": "text",
                      "text": "Computer Specialist"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "salary",
                  "elements": [
                    {
                      "type": "text",
                      "text": "90,000"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "gender",
                  "elements": [
                    {
                      "type": "text",
                      "text": "male"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "address",
                  "attributes": [
                    {
                      "name": "street",
                      "value": "Yes",
                      "elements": []
                    }
                  ],
                  "elements": [
                    {
                      "type": "text",
                      "text": "1821 Nordic. Road, Irving Texas 98558"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    files["hc_nodtdstaff.xml"]    = {"elements":[{"type":"element","name":"html","attributes":[{"name":"xmlns","value":"http://www.w3.org/1999/xhtml","elements":[]}],"elements":[{"type":"element","name":"head","elements":[{"type":"element","name":"meta","attributes":[{"name":"http-equiv","value":"Content-Type","elements":[]},{"name":"content","value":"text/html; charset=UTF-8","elements":[]}]},{"type":"element","name":"title","elements":[{"type":"text","text":"hc_nodtdstaff"}]}]},{"type":"element","name":"body","attributes":[{"name":"onload","value":"parent.loadComplete()","elements":[]}],"elements":[{"type":"element","name":"p","elements":[{"type":"element","name":"em","elements":[{"type":"text","text":"EMP0001"}]},{"type":"element","name":"strong","elements":[{"type":"text","text":"Margaret Martin"}]},{"type":"element","name":"code","elements":[{"type":"text","text":"Accountant"}]},{"type":"element","name":"sup","elements":[{"type":"text","text":"56,000"}]},{"type":"element","name":"var","elements":[{"type":"text","text":"Female"}]},{"type":"element","name":"acronym","attributes":[{"name":"title","value":"Yes","elements":[]}],"elements":[{"type":"text","text":"1230 North Ave. Dallas, Texas 98551"}]}]}]}]}],"declaration":null}	
    
    files["hc_staff.html"]        = 
    {
      "elements": [
        {
          "type": "doctype",
          "doctype": "html PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \n    \"http://www.w3.org/TR/html4/strict.dtd\" "
        },
        {
          "type": "comment",
          "comment": " This is comment number 1."
        },
        {
          "type": "element",
          "name": "html",
          "elements": [
            {
              "type": "element",
              "name": "head",
              "elements": [
                {
                  "type": "element",
                  "name": "meta",
                  "attributes": [
                    {
                      "name": "http-equiv",
                      "value": "Content-Type",
                      "elements": []
                    },
                    {
                      "name": "content",
                      "value": "text/html; charset=UTF-8",
                      "elements": []
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "title",
                  "elements": [
                    {
                      "type": "text",
                      "text": "hc_staff"
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "script",
                  "attributes": [
                    {
                      "name": "type",
                      "value": "text/javascript",
                      "elements": []
                    },
                    {
                      "name": "src",
                      "value": "svgunit.js",
                      "elements": []
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "script",
                  "attributes": [
                    {
                      "name": "charset",
                      "value": "UTF-8",
                      "elements": []
                    },
                    {
                      "name": "type",
                      "value": "text/javascript",
                      "elements": []
                    },
                    {
                      "name": "src",
                      "value": "svgtest.js",
                      "elements": []
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "script",
                  "attributes": [
                    {
                      "name": "type",
                      "value": "text/javascript",
                      "elements": []
                    }
                  ],
                  "elements": [
                    {
                      "type": "text",
                      "text": "function loadComplete() { startTest(); }"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "name": "body",
              "attributes": [
                {
                  "name": "onload",
                  "value": "parent.loadComplete()",
                  "elements": []
                }
              ],
              "elements": [
                {
                  "type": "element",
                  "name": "p",
                  "elements": [
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "em",
                      "elements": [
                        {
                          "type": "text",
                          "text": "EMP0001"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "strong",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Margaret Martin"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "code",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Accountant"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "sup",
                      "elements": [
                        {
                          "type": "text",
                          "text": "56,000"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "var",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Female"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "acronym",
                      "attributes": [
                        {
                          "name": "title",
                          "value": "Yes",
                          "elements": []
                        }
                      ],
                      "elements": [
                        {
                          "type": "text",
                          "text": "1230 North Ave. Dallas, Texas 98551"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n "
                    },
                  ]
                },
                {
                  "type": "element",
                  "name": "p",
                  "elements": [
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "em",
                      "elements": [
                        {
                          "type": "text",
                          "text": "EMP0002"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "strong",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Martha RaynoldsThis is a CDATASection with EntityReference number 2 &ent2;\nThis is an adjacent CDATASection with a reference to a tab &tab;"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "code",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Secretary"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "sup",
                      "elements": [
                        {
                          "type": "text",
                          "text": "35,000"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "var",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Female"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "acronym",
                      "attributes": [
                        {
                          "name": "title",
                          "value": "Yes",
                          "elements": []
                        },
                        {
                          "name": "class",
                          "value": "Yes",
                          "elements": []
                        }
                      ],
                      "elements": [
                        {
                          "type": "text",
                          "text": "β Dallas, γ\n 98554"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n "
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "p",
                  "elements": [
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "em",
                      "elements": [
                        {
                          "type": "text",
                          "text": "EMP0003"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "strong",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Roger\n Jones"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "code",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Department Manager"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "sup",
                      "elements": [
                        {
                          "type": "text",
                          "text": "100,000"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "var",
                      "elements": [
                        {
                          "type": "text",
                          "text": "δ"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n  "
                    },
                    {
                      "type": "element",
                      "name": "acronym",
                      "attributes": [
                        {
                          "name": "title",
                          "value": "Yes",
                          "elements": []
                        },
                        {
                          "name": "class",
                          "value": "No",
                          "elements": []
                        }
                      ],
                      "elements": [
                        {
                          "type": "text",
                          "text": "PO Box 27 Irving, texas 98553"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "\n "
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "p",
                  "elements": [
                    {
                      "type": "element",
                      "name": "em",
                      "elements": [
                        {
                          "type": "text",
                          "text": "EMP0004"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "strong",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Jeny Oconnor"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "code",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Personnel Director"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "sup",
                      "elements": [
                        {
                          "type": "text",
                          "text": "95,000"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "var",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Female"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "acronym",
                      "attributes": [
                        {
                          "name": "title",
                          "value": "Yes",
                          "elements": []
                        },
                        {
                          "name": "class",
                          "value": "Yα",
                          "elements": []
                        }
                      ],
                      "elements": [
                        {
                          "type": "text",
                          "text": "27 South Road. Dallas, Texas 98556"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "element",
                  "name": "p",
                  "elements": [
                    {
                      "type": "element",
                      "name": "em",
                      "elements": [
                        {
                          "type": "text",
                          "text": "EMP0005"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "strong",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Robert Myers"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "code",
                      "elements": [
                        {
                          "type": "text",
                          "text": "Computer Specialist"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "sup",
                      "elements": [
                        {
                          "type": "text",
                          "text": "90,000"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "var",
                      "elements": [
                        {
                          "type": "text",
                          "text": "male"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "name": "acronym",
                      "attributes": [
                        {
                          "name": "title",
                          "value": "Yes",
                          "elements": []
                        }
                      ],
                      "elements": [
                        {
                          "type": "text",
                          "text": "1821 Nordic. Road, Irving Texas 98558"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "declaration": {
        "type": "DOCTYPE",
        "doc_name": "html",
        "system": "PUBLIC",
        "dtd": "-//W3C//DTD HTML 4.01//EN",
        "dtd2": "http://www.w3.org/TR/html4/strict.dtd"
      }
    };

    files["cash_events.html"]     = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"head"},{"type":"element","name":"body","elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"parent","elements":[]}],"elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"event","elements":[]}],"elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"child","elements":[]}]}]},{"type":"element","name":"input","attributes":[{"name":"class","value":"event-focus","elements":[]}]}]}]}]}],"declaration":null};
    files["cash_core.html"]       = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"body","elements":[{"type":"element","name":"div","attributes":[{"name":"id","value":"id","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"id","value":"id","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"single","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"multiple","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"multiple","elements":[]}]},{"type":"element","name":"main"},{"type":"element","name":"main"}]}]}],"declaration":null}
    files["cash_data.html"]       = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"data","elements":[]},{"name":"data-one","value":"one","elements":[]},{"name":"data-two","value":"two","elements":[]}]}]}],"declaration":null};	
    files["cash_attributes.html"] = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"body","elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"attr","elements":[]},{"name":"one","value":"one","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"class","elements":[]}]},{"type":"element","name":"input","attributes":[{"name":"class","value":"prop","elements":[]},{"name":"type","value":"checkbox","elements":[]},{"name":"checked","value":"true","elements":[]}]}]}]}],"declaration":null};
    files["cash_collection.html"] = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"body","elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"prevprev sibling","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"prev sibling","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"anchor sibling","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"next sibling","elements":[]}]},{"type":"element","name":"div","attributes":[{"name":"class","value":"nextnext sibling","elements":[]}]}]}]}],"declaration":null};
    files["cash_css.html"]        = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"body","elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"css","elements":[]},{"name":"style","value":"height: 50px; position: static;","elements":[]}]}]}]}],"declaration":null};
    files["cash_dimensions.html"] = {"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"body","elements":[{"type":"element","name":"div","attributes":[{"name":"class","value":"rectangle","elements":[]},{"name":"style","value":"width: 100px; height: 50px; padding: 5px; margin: 10px; border: 1px solid red;","elements":[]}]}]}]}],"declaration":null};

    /*
    * @id getJSON
    */
    function getJSON(filename){
        return files[filename];
    }

    return {'getJSON': getJSON};

}

module.exports = initHTMLFiles;