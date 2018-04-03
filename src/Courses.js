import './Courses.css'
import React, { Component } from 'react';
//import CourseSearch from './Courses.js';
//import Delay from 'react-delay';
//import ReactLoading from 'react-Loading';
import { Button, Form, FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';

export default class Courses extends Component {
	constructor(props){
		super(props);
		this.state = {
			courseList: [],
      searchFound: true,
      courseQueries: {}
    	};
	

	this.findCourses = this.findCourses.bind(this);
	this.selectRequirement = this.selectRequirement.bind(this);
	this.selectYear = this.selectYear.bind(this);
	this.selectSemester = this.selectSemester.bind(this);
	this.selectSemester = this.selectDepartment.bind(this);
	this.submit = this.submit.bind(this);
	this.searchButton = this.searchButton.bind(this);

	}

	findCourses(){
		let website = 'https://www.eg.bucknell.edu/~amm042/service/q?limit=99999';
    	const searches = this.state.courseQueries;
    	for(const key in searches) {
      		if(searches[key]) {
      			let i = searches[key];
      			website += i;
      		}
		}
		fetch(website)
		.then( res => {
			res.json()
			.then( data=> {
				this.setState({
					courseList: data.message

				});
			})
      .catch()
		})
    .catch(error => console.log("Error had occured:" + error))
	}

	selectRequirement(requirements) {
    	if(requirements.target.value === 'select') {
      		this.setState({
        		courseQueries: {
          			requirement: null,
          			year: this.state.courseQueries.year,
          			semester: this.state.courseQueries.semester,
			          department: this.state.courseQueries.department
			    }
			});
    	} else {
      		this.setState({
		        courseQueries: {
		          	requirement: `&Requirement=${requirements.target.value}`,
		          	year: this.state.courseQueries.year,
		          	semester: this.state.courseQueries.semester,
		          	department: this.state.courseQueries.department
		        }
		    });
		}
  }

	selectYear(years) {
    	if(years.target.value === 'select') {
      		this.setState({
        		courseQueries: {
          			requirement: this.state.courseQueries.requirement,
          			year: null,
          			semester: this.state.courseQueries.semester,
          			department: this.state.courseQueries.department
        		}
      		});
    	}
    	else {
    		this.setState({
        		courseQueries: {
        	  		requirement: this.state.courseQueries.requirement,
          			year: `&Year=${years.target.value}`,
          			semester: this.state.courseQueries.semester,
          			department: this.state.courseQueries.department
        		}
      		});
    	}
  	}

  	selectSemester(semesters) {
    	if(semesters.target.value === 'select') {
      		this.setState({
        		courseQueries: {
          			requirement: this.state.courseQueries.requirement,
          			year: this.state.courseQueries.year,
          			semester: null,
          			department: this.state.courseQueries.department
        		}
      		});
    	}
    	else {
      		this.setState({
				courseQueries: {
			 		requirement: this.state.courseQueries.requirement,
			  		year: this.state.courseQueries.year,
			  		semester: `&Semester=${semesters.target.value}`,
			  		department: this.state.courseQueries.department
				}
			});
    	}
  	}

  	selectDepartment(departments) {
    	if(departments.target.value.length === 'select') {
		    this.setState({
		        courseQueries: {
			        requirement: this.state.courseQueries.requirement,
		          year: this.state.courseQueries.year,
			        semester: this.state.courseQueries.semester,
			        department: null
		        }
		    });
    	}
    	else {
      		this.setState({
        		courseQueries: {
          			requirement: this.state.courseQueries.requirement,
          			year: this.state.courseQueries.year,
          			semester: this.state.courseQueries.semester,
          			department: `&Department=${departments.target.value}`
        		}
      		});
    	}
  	}

  	submit(a) {
    	a.preventDefault();
    	this.setState({
      		//loading: true
      		searchFound: false,
    	});
    	this.findCourses();
  	}

  	searchButton() {
    	this.setState({
      		courseQueries: {},
      		courseList: [],
      		//loading: false
      		searchFound: true,
	    })
  	}


  	render() {
    return (
      	<div className="Courses">
        	{this.state.searchFound}
          		<div className="form">
            		<Form onSubmit={this.submit}>
              			<div className="dropdownBar">
                    <div class="container">
                    <div class="row1">
                    <div class="column1">
              			<FormGroup controlId="form1" onChange={this.selectRequirement}>
                      <ControlLabel> Course Requirement </ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                          <option value= "select"> </option>
                          <option value="select"></option>
                          <option VALUE="AHLG">Arts and Humanities Learning Goals</option>
                          <option VALUE="CBL">Community Based Learning</option>
                          <option VALUE="DUSC">Diversity in the U.S.</option>
                          <option VALUE="GLSP">Engineering Global and Societal Perspectives</option>
                          <option VALUE="EGHU">Engineering Humanities</option>
                          <option VALUE="EGSS">Engineering Social Science</option>
                          <option VALUE="EVCN">Environmental Connections</option>
                          <option VALUE="FRST">First year course</option>
                          <option VALUE="CCFL">Foreign Language</option>
                          <option VALUE="FOUN">Foundation Seminar</option>
                          <option VALUE="GBCC">Global Connections</option>
                          <option VALUE="CCIP">Integrated Perspectives</option>
                          <option VALUE="LBSC">Lab Science</option>
                          <option VALUE="NSMC">Natural Science and Mathematics</option>
                          <option VALUE="NMLG">Natural Science and Mathematics Learning Goals</option>
                          <option VALUE="CCQR">Quantitative Reasoning</option>
                          <option VALUE="SL">Service Learning Course</option>
                          <option VALUE="SLSC">Social Science</option>
                          <option VALUE="SSLG">Social Science Learning Goals</option>
                          <option VALUE="W1">Writing Level 1</option>
                          <option VALUE="W2">Writing Level 2</option>
                        </FormControl>
                    </FormGroup>
                    </div>

                    <div class="column1">
                    <FormGroup controlId="form1" onChange={this.selectYear}>
                      <ControlLabel> Select Year </ControlLabel>
                        <FormControl componentClass="select" placeholder = "select">
                          <option value="select"></option>
                          <option value="2018">2018</option>
                          <option value="2019">2019</option>
                        </FormControl>
                        <small id="emailHelp" class="form-text text-muted">This is the course requirement you need to fill</small>
                    </FormGroup>
                    </div>

                    <div class="column1">
                    <FormGroup controlId="form1" onChange={this.selectSemester}>
                      <ControlLabel>Semester</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                          <option value="select"></option>
                          <option value="Fall">Fall</option>
                          <option value="Spring">Spring</option>
                        </FormControl>
                    </FormGroup>
                    </div>

                    <div class="column1">
                		<FormGroup controlId="form1" onChange={this.selectDepartment}>
                  			<ControlLabel>Department</ControlLabel>
                  			<FormControl componentClass="select" placeholder="select">
                    			<option value="select"></option>
			                    <option value="ACFM">ACFM (Acct & Financial Management)</option>
			                    <option value="OFFAF">OFFAF (Africa)</option>
			                    <option value="AFST">AFST (Africana Studies)</option>
			                    <option value="ANBE">ANBE (Animal Behavior)</option>
			                    <option value="ANTH">ANTH (Anthropology)</option>
			                    <option value="ARBC">ARBC (Arabic)</option>
			                    <option value="ARTH">ARTH (Art History)</option>
			                    <option value="ARST">ARST (Art Studio)</option>
			                    <option value="ASTR">ASTR (Astronomy)</option>
			                    <option value="BIOL">BIOL (Biology)</option>
			                    <option value="BMEG">BMEG (Biomedical Engineering)</option>
			                    <option value="OFFL">OFFL (Bucknell London Semester)</option>
			                    <option value="OFFD">OFFD (Bucknell en Espana (Granada))</option>
			                    <option value="OFFF">OFFF (Bucknell en France)</option>
			                    <option value="OFFAT">OFFAT (Bucknell in Athens)</option>
			                    <option value="OFFGH">OFFGH (Bucknell in Ghana)</option>
			                    <option value="OFFG">OFFG (Bucknell in Nicaragua)</option>
			                    <option value="OFFCB">OFFCB (Caribbean)</option>
			                    <option value="CHEG">CHEG (Chemical Engineering)</option>
			                    <option value="CHEM">CHEM (Chemistry)</option>
			                    <option value="CHIN">CHIN (Chinese)</option>
			                    <option value="CEEG">CEEG (Civil & Environmental Engr)</option>
			                    <option value="CLAS">CLAS (Classics)</option>
			                    <option value="CSCI">CSCI (Computer Science)</option>
			                    <option value="ENCW">ENCW (Creative Writing)</option>
			                    <option value="DANC">DANC (Dance)</option>
			                    <option value="OFFDN">OFFDN (Denmark Program)</option>
			                    <option value="EAST">EAST (East Asian Studies)</option>
			                    <option value="ECON">ECON (Economics)</option>
			                    <option value="EDUC">EDUC (Education)</option>
			                    <option value="ECEG">ECEG (Electrical & Computer Engr.)</option>
			                    <option value="ENGR">ENGR (Engineering)</option>
			                    <option value="ENGL">ENGL (English)</option>
			                    <option value="ENST">ENST (Environmental Studies)</option>
			                    <option value="ENFS">ENFS (Film/Media Studies)</option>
			                    <option value="FOUN">FOUN (Foundation Seminar)</option>
			                    <option value="FREN">FREN (French)</option>
			                    <option value="GEOG">GEOG (Geography)</option>
			                    <option value="GEOL">GEOL (Geology)</option>
			                    <option value="GRMN">GRMN (German)</option>
			                    <option value="GLBM">GLBM (Global Management)</option>
			                    <option value="GREK">GREK (Greek)</option>
			                    <option value="HEBR">HEBR (Hebrew)</option>
			                    <option value="HIST">HIST (History)</option>
			                    <option value="HUMN">HUMN (Humanities)</option>
			                    <option value="IDPT">IDPT (Interdepartmental)</option>
			                    <option value="IREL">IREL (International Relations)</option>
			                    <option value="ITAL">ITAL (Italian)</option>
			                    <option value="OFFJP">OFFJP (Japan)</option>
			                    <option value="JAPN">JAPN (Japanese)</option>
			                    <option value="LATN">LATN (Latin)</option>
			                    <option value="LAMS">LAMS (Latin American Studies)</option>
			                    <option value="LEGL">LEGL (Legal Studies)</option>
			                    <option value="LING">LING (Linguistics)</option>
			                    <option value="ENLS">ENLS (Literary Studies)</option>
			                    <option value="MGMT">MGMT (Management)</option>
			                    <option value="MSUS">MSUS (Managing for Sustainability)</option>
			                    <option value="MIDE">MIDE (Markets, Innovation & Design)</option>
			                    <option value="MATH">MATH (Mathematics)</option>
			                    <option value="MECH">MECH (Mechanical Engineering)</option>
			                    <option value="MILS">MILS (Military Science)</option>
			                    <option value="MUSC">MUSC (Music)</option>
			                    <option value="NEUR">NEUR (Neuroscience)</option>
			                    <option value="OCST">OCST (Off Campus Study)</option>
			                    <option value="PHIL">PHIL (Philosophy)</option>
			                    <option value="PHYS">PHYS (Physics)</option>
			                    <option value="POLS">POLS (Political Science)</option>
			                    <option value="PSYC">PSYC (Psychology)</option>
			                    <option value="RELI">RELI (Religion)</option>
			                    <option value="RESC">RESC (Residential Colleges)</option>
			                    <option value="RUSS">RUSS (Russian)</option>
			                    <option value="SIGN">SIGN (Sign Language)</option>
			                    <option value="SOCI">SOCI (Sociology)</option>
			                    <option value="SPAN">SPAN (Spanish)</option>
			                    <option value="SLIF">SLIF (Student Life)</option>
			                    <option value="THEA">THEA (Theatre)</option>
			                    <option value="UNIV">UNIV (University Course)</option>
			                    <option value="WMST">WMST (Womens and Gender Studies)</option>
			                  </FormControl>
                    </FormGroup>
                    </div>
                  </div>
              <div class = "row">
                <Button type="submit">Search</Button>
            </div>
            </div>
            </div>
            </Form>
          </div>
        : null
        }
        {this.state.courseList.length !== 0}
          <classSearch
            courses={this.state.courseQueries}
            searchButton={this.searchButton}
          />
          : null
        }
      </div>
    );
  }
}

export function courseQueries(props) {
    return (
        <div className="SearchResults">
      {props.courses.length !== 0}
        <div class="container">
          <div className="results col">
            <div className="allCourses">
              {props.courses.map(function(course, i) {
                var courseKey = 'course_'+i;
                var hasRoom = false;
                if(course.Room.length > false) {
                  hasRoom = true;
                }
                var hasLab = false;
                if(course.CrseNum.toUpperCase().includes('L')) {
                  hasLab = true;
                }
                var isRec = false;
                if(course.CrseNum.toUpperCase().includes('R')) {
                  isRec = true;
                }

                if(!hasLab && !isRec) {
                  return(
                    <div key={courseKey} className='course'>
                      <h4>{course.Course}: {course.Title}</h4>
                      <h4> Meeting Time (If empty not assigned): {course["Time:"]}</h4>
                      { hasRoom } <h4>Room: {course.Room}</h4> : null
                      }
                      {
                        course.Labs.map(function(lab, j) {
                          var labKey = 'extra'+j;
                          return(
                            <div key={labKey} className='extra'>
                              <h4>{lab.Course}: {lab.Title}</h4>
                              <h4>Meeting Time (If empty not assigned): {lab["Meeting Time"]}</h4>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
                else {
                  return(null);
                }
              })}
            </div>
            </div>
          </div> : null
      }
    </div>
    );
}



