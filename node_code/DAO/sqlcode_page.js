const DAO = require("./DAO");

class sqlClass {
  constructor(dbfile_path) {
    //this.dao = dao;
    this.apdao = new DAO(dbfile_path);
    // this.dbfile_path =
    //   "E:\\React\\umpire_schedule\\cricExtra\\db_code\\sqlite3_db\\cricextra_db";
  }

  getSQLUsingQuery(query, columns, queryCol) {
    let sql = "";
    for (let i = 0; i < columns.length; i++) {
      if (query[queryCol[i]] && query[queryCol[i]] != "") {
        if (sql == "") {
          sql += `${columns[i]}='${query[queryCol[i]]}' COLLATE NOCASE`;
        } else {
          sql += ` AND ${columns[i]}='${query[queryCol[i]]}' COLLATE NOCASE`;
        }
      }
    }
    return sql;
  }
  getUserHomePage(userid) {
    this.sql_getUserHomePage = `SELECT A.id, B.team_name Home_Team, C.team_name Away_Team,
    F.venue_name, (F.street || ', ' || F.city || ', ' || F.state || ', ' || F.zip) AS Address,
    H.full_name,A.time,A.date, A.match_type
    FROM match_tb A 
    INNER JOIN team_tb B, team_tb C ON ((B.id = A.team1_id) AND (C.id = A.team2_id)) 
    LEFT JOIN venue_tb F ON (F.id = A.venue_id)
    LEFT JOIN umpire_tb G ON (G.id = A.umpire_id)
    LEFT JOIN user_tb H ON (G.user_id = H.id)
    WHERE (A.team1_id = (SELECT D.team_id FROM  user_tb D WHERE D.id = ${userid})) OR
    (A.team2_id = (SELECT E.team_id FROM  user_tb E WHERE E.id = ${userid}))`;
    //console.log(this.sql_getHomePageData);
    return this.apdao.all(this.sql_getUserHomePage);
  }

  // ======================================================================================= //
  // ========================================   MATCHES  =================================== //
  getMatchUsingId(id) {
    let sql_getMatch = `SELECT A.id, B.team_name Home_Team, C.team_name Away_Team,
    F.venue_name, (F.street || ', ' || F.city || ', ' || F.state || ', ' || F.zip) AS Address,
    H.full_name,A.time,A.date, A.match_type
    FROM match_tb A 
    INNER JOIN team_tb B, team_tb C ON ((B.id = A.team1_id) AND (C.id = A.team2_id)) 
    LEFT JOIN venue_tb F ON (F.id = A.venue_id)
    LEFT JOIN umpire_tb G ON (G.id = A.umpire_id)
    LEFT JOIN user_tb H ON (G.user_id = H.id)
    WHERE A.id = ${id}`;
    let match = this.apdao.all(sql_getMatch);
    return match;
  }

  getMatchUsingQuery(query) {
    let queryCol = [
      "id",
      "venue_id",
      "umpire_id",
      "time",
      "date",
      "match_type"
    ];
    let columns = [
      "A.id",
      "A.venue_id",
      "A.umpire_id",
      "A.time",
      "A.date",
      "A.match_type"
    ];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    if (query.team_id && query.team_id !== "") {
      if (getsql == "") {
        getsql += `(A.team1_id=${query.team_id} or A.team2_id=${query.team_id})`;
      } else {
        getsql += ` AND (A.team1_id=${query.team_id} or A.team2_id=${query.team_id})`;
      }
    }
    if (query.user_id && query.user_id !== "") {
      if (getsql == "") {
        getsql += `(A.team1_id = (SELECT D.team_id FROM  user_tb D WHERE D.id = ${query.user_id})) OR
        (A.team2_id = (SELECT E.team_id FROM  user_tb E WHERE E.id = ${query.user_id}))`;
      } else {
        getsql += ` AND (A.team1_id = (SELECT D.team_id FROM  user_tb D WHERE D.id = ${query.user_id})) OR
        (A.team2_id = (SELECT E.team_id FROM  user_tb E WHERE E.id = ${query.user_id}))`;
      }
    }
    if (query.email_id && query.email_id !== "") {
      if (getsql == "") {
        getsql += `(A.team1_id = (SELECT D.team_id FROM  user_tb D WHERE D.email_id = '${query.email_id}' COLLATE NOCASE)) OR
        (A.team2_id = (SELECT E.team_id FROM  user_tb E WHERE E.email_id = '${query.email_id}' COLLATE NOCASE))`;
      } else {
        getsql += ` AND (A.team1_id = (SELECT D.team_id FROM  user_tb D WHERE D.email_id = '${query.email_id}' COLLATE NOCASE)) OR
        (A.team2_id = (SELECT E.team_id FROM  user_tb E WHERE E.email_id = '${query.email_id}' COLLATE NOCASE))`;
      }
    }
    let sql_matches =
      `SELECT A.id, B.team_name Home_Team, C.team_name Away_Team,
      F.venue_name, (F.street || ', ' || F.city || ', ' || F.state || ', ' || F.zip) AS Address,
      H.full_name,A.time,A.date, A.match_type
      FROM match_tb A 
      INNER JOIN team_tb B, team_tb C ON ((B.id = A.team1_id) AND (C.id = A.team2_id)) 
      LEFT JOIN venue_tb F ON (F.id = A.venue_id)
      LEFT JOIN umpire_tb G ON (G.id = A.umpire_id)
      LEFT JOIN user_tb H ON (G.user_id = H.id) WHERE ` + getsql;
    return this.apdao.all(sql_matches);
  }

  getAllMatches() {
    this.sql_getAllMatches = `SELECT A.id, B.team_name Home_Team, C.team_name Away_Team,
    F.venue_name, (F.street || ', ' || F.city || ', ' || F.state || ', ' || F.zip) AS Address,
    H.full_name,A.time,A.date, A.match_type
    FROM match_tb A 
    INNER JOIN team_tb B, team_tb C ON ((B.id = A.team1_id) AND (C.id = A.team2_id)) 
    LEFT JOIN venue_tb F ON (F.id = A.venue_id)
    LEFT JOIN umpire_tb G ON (G.id = A.umpire_id)
    LEFT JOIN user_tb H ON (G.user_id = H.id)`;
    return this.apdao.all(this.sql_getAllMatches);
  }

  addNewMatch(postData) {
    this.sql_insertMatchDetails = `INSERT INTO match_tb(team1_id, team2_id, venue_id, umpire_id, time, date, match_type) 
    VALUES(${postData.hTeam},${postData.aTeam},${postData.venue},${postData.umpire},'${postData.time}',
    '${postData.date}', '${postData.matchType}')`;
    // console.log(this.sql_insertMatchDetails);

    // this.sql_insertMatchDetails = `insert into match_tb(team1_id, team2_id, venue_id, umpire_id, time, date)
    // select 2, 3, A.id, B.id, '19:04:30', '2019-10-23' from venue_tb A, umpire_tb B, user_tb C
    // where A.venue_name = 'Raman_ground' OR C.full_name = 'Kumaren Basu' AND B.user_id = C.id`
    return this.apdao.run(this.sql_insertMatchDetails);
  }

  updateMatch(putData) {
    this.sql_updateMatchDetails = `UPDATE match_tb SET team1_id=${putData.hTeam}, 
    team2_id=${putData.aTeam}, venue_id=${putData.venue}, umpire_id=${putData.umpire}, 
    time='${putData.time}', date='${putData.date}', match_type='${putData.mType}'
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateMatchDetails);
  }

  deleteMatch(id) {
    this.sql_deleteMatchDetails = `DELETE FROM match_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteMatchDetails);
  }

  // ===================================================================================== //
  // ========================================   TEAMS  =================================== //
  getTeamUsingId(teamid) {
    // let sql_getTeamPlayers = `SELECT id player_id, full_name player_name
    //   FROM user_tb WHERE team_id = ${teamid}
    //   ORDER BY player_id ASC`;
    // let sql_getTeamInfo = `SELECT id, team_name, captain_id, manager_id
    //   FROM team_tb WHERE id = ${teamid}`;
    let sql_getTeamInfo = `SELECT A.id, A.team_name, B.full_name captain_name, C.full_name manager_name, 
    B.phone_no captain_contact_no, C.phone_no as manager_contact_no FROM team_tb A
    LEFT JOIN user_tb B ON (A.captain_id = B.id)
    LEFT JOIN user_tb C ON (A.manager_id = C.id)
    WHERE A.id = ${teamid}`;
    // let getTeamPlayers = this.apdao.all(sql_getTeamPlayers);
    let getTeamInfo = this.apdao.all(sql_getTeamInfo);
    // return [getTeamPlayers, getTeamInfo];
    return getTeamInfo;
  }

  getTeamUsingQuery(query) {
    let queryCol = ["id", "team_name", "captain_id", "manager_id"];
    let columns = ["A.id", "A.team_name", "A.captain_id", "A.manager_id"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    if (query.player_id && query.player_id !== "") {
      if (getsql == "") {
        // sql += `id=(SELECT team_id FROM user_tb WHERE full_name=${query.player}`;
        getsql += `A.id=(SELECT team_id FROM user_tb WHERE id=${query.player_id})`;
      } else {
        // getTsql += ` AND id=(SELECT team_id FROM user_tb WHERE full_name=${query.player}`;
        getsql += ` AND A.id=(SELECT team_id FROM user_tb WHERE id=${query.player_id})`;
      }
    }
    // this.sql_getTeamInfo =
    //   `SELECT id, team_name, captain_id, manager_id FROM team_tb WHERE ` +
    //   getsql;
    let sql_getTeamInfo =
      `SELECT A.id, A.team_name, B.full_name captain_name, C.full_name manager_name, 
      B.phone_no captain_contact_no, C.phone_no as manager_contact_no FROM team_tb A
      LEFT JOIN user_tb B ON (A.captain_id = B.id)
      LEFT JOIN user_tb C ON (A.manager_id = C.id) WHERE ` + getsql;
    return this.apdao.all(sql_getTeamInfo);
  }

  getTeamList() {
    this.sql_getTeamList = `SELECT A.id, A.team_name, B.full_name captain_name, C.full_name manager_name, 
    B.phone_no captain_contact_no, C.phone_no as manager_contact_no FROM team_tb A
    LEFT JOIN user_tb B ON (A.captain_id = B.id)
    LEFT JOIN user_tb C ON (A.manager_id = C.id)
    ORDER BY A.id ASC`;
    return this.apdao.all(this.sql_getTeamList);
  }

  addNewTeam(postData) {
    this.sql_insertTeamDetails = `INSERT INTO team_tb(team_name, captain_id, manager_id) 
    VALUES('${postData.teamName}',${postData.captainUserId},${postData.managerUserId})`;
    return this.apdao.run(this.sql_insertTeamDetails);
  }

  updateTeam(putData) {
    this.sql_updateTeamDetails = `UPDATE team_tb SET team_name='${putData.teamName}', 
    captain_id=${putData.captainUserId}, manager_id=${putData.managerUserId}
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateTeamDetails);
  }

  deleteTeam(id) {
    this.sql_deleteTeamDetails = `DELETE FROM team_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteTeamDetails);
  }

  // ======================================================================================= //
  // ==================================   USERS/PLAYERS  =================================== //
  getPlayerUsingId(id) {
    let sql_getPlayer = `SELECT A.id, A.first_name, A.last_name, A.middle_name, A.full_name, 
    A.email_id, A.phone_no contact_no, B.team_name, C.id umpire_id, A.role_id
    FROM user_tb A 
    LEFT JOIN team_tb B ON (A.team_id = B.id) 
    LEFT JOIN umpire_tb C ON (A.id = C.user_id) 
    WHERE A.id = ${id}`;
    let result = this.apdao.all(sql_getPlayer);
    return result;
  }
  getPlayerUsingQuery(query) {
    let queryCol = [
      "id",
      "first_name",
      "last_name",
      "email_id",
      "full_name",
      "team_id",
      "role_id"
    ];
    let columns = [
      "A.id",
      "A.first_name",
      "A.last_name",
      "A.email_id",
      "A.full_name",
      "A.team_id",
      "A.role_id"
    ];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    let sql_getPlayers =
      `SELECT A.id, A.first_name, A.last_name, A.middle_name, A.full_name, A.email_id, 
      A.phone_no contact_no, B.team_name, C.id umpire_id, A.role_id
      FROM user_tb A 
      LEFT JOIN team_tb B ON (A.team_id = B.id) 
      LEFT JOIN umpire_tb C ON (A.id = C.user_id) 
      WHERE ` + getsql;
    return this.apdao.all(sql_getPlayers);
  }

  getPlayerList() {
    this.sql_getPlayerList = `SELECT A.id, A.first_name, IFNULL(A.last_name, "") last_name, 
    IFNULL(A.middle_name, "") middle_name, A.full_name, A.email_id, IFNULL(A.phone_no, "") contact_no, 
    IFNULL(B.team_name, "") team_name, IFNULL(C.id, "") umpire_id, A.role_id
    FROM user_tb A 
    LEFT JOIN team_tb B ON (A.team_id = B.id) 
    LEFT JOIN umpire_tb C ON (A.id = C.user_id) 
    ORDER BY A.full_name ASC`;
    return this.apdao.all(this.sql_getPlayerList);
  }

  addNewPlayer(postData) {
    this.sql_insertPlayerDetails = `INSERT INTO user_tb(first_name, last_name, middle_name, email_id, 
      full_name, team_id, phone_no, password, secret_ques_id, secret_answer, 
      created_timestamp, modified_timestamp, role_id) 
    VALUES('${postData.firstName}','${postData.lastName}','${postData.middleName}','${postData.emailId}',
    '${postData.fullName}',${postData.teamId},'${postData.phone}','${postData.password}',
    '${postData.secretQid}','${postData.secretA}','${postData.created}','${postData.modified}',
    ${postData.roleId})`;
    return this.apdao.run(this.sql_insertPlayerDetails);
  }

  updatePlayer(putData) {
    this.sql_updatePlayerDetails = `UPDATE user_tb SET first_name='${putData.firstName}', 
    last_name='${putData.lastName}', middle_name='${putData.middleName}', email_id='${putData.emailId}', 
    full_name='${putData.fullName}', team_id=${putData.teamId},phone_no=${putData.phone},
    modified_timestamp='${putData.modified}',role_id=${putData.roleId}
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updatePlayerDetails);
  }

  deletePlayer(id) {
    this.sql_deletePlayerDetails = `DELETE FROM user_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deletePlayerDetails);
  }

  // ======================================================================================= //
  // ==================================   USER LOGIN  =================================== //

  // getUserLoginList() {
  //   this.sql_getUserLoginList = `SELECT A.id, A.email_id, A.password, B.question, A.secret_answer
  //   FROM user_tb A
  //   INNER JOIN secret_ques_tb B ON (A.secret_ques_id = B.id)
  //   ORDER BY A.id ASC`;
  //   return this.apdao.all(this.sql_getUserLoginList);
  // }
  getUserLoginList() {
    this.sql_getUserLoginList = `SELECT id, email_id, password, role_id
      FROM user_tb ORDER BY id ASC`;
    return this.apdao.all(this.sql_getUserLoginList);
  }

  getLoginUsingQuery(query) {
    let queryCol = ["email_id"];
    let columns = ["email_id"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);

    this.sql_getLoginUsingQuery =
      `SELECT id, email_id, password, role_id FROM user_tb WHERE ` + getsql;
    return this.apdao.all(this.sql_getLoginUsingQuery);
  }

  // ======================================================================================= //
  // ==================================   USER ROLE  =================================== //

  getUserRoleList() {
    this.sql_getUserRoleList = `SELECT id, role FROM user_role_tb ORDER BY id ASC`;
    return this.apdao.all(this.sql_getUserRoleList);
  }

  getUserRoleUsingQuery(query) {
    let queryCol = ["id", "role"];
    let columns = ["id", "role"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);

    this.sql_getUserRoleUsingQuery =
      `SELECT id, role FROM user_role_tb WHERE ` + getsql;
    return this.apdao.all(this.sql_getUserRoleUsingQuery);
  }

  // ======================================================================================= //
  // ==================================   SECRET QUESTION  =================================== //

  getSecretQList() {
    this.sql_getSecretQList = `SELECT id, question FROM secret_ques_tb ORDER BY id ASC`;
    return this.apdao.all(this.sql_getSecretQList);
  }

  // ======================================================================================= //
  // ======================================   UMPIRES  ===================================== //
  getUmpireUsingId(id) {
    let sql_getUmpire = `SELECT A.id, A.user_id, B.full_name 
    FROM umpire_tb A
    INNER JOIN user_tb B
    ON (A.user_id = B.id)
    WHERE A.id = ${id}`;
    let result = this.apdao.all(sql_getUmpire);
    return result;
  }
  getUmpireUsingQuery(query) {
    let queryCol = ["id", "user_id"];
    let columns = ["A.id", "A.user_id"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    let sql_getUmpires =
      `SELECT A.id, A.user_id, B.full_name 
      FROM umpire_tb A
      INNER JOIN user_tb B
      ON (A.user_id = B.id) WHERE ` + getsql;
    return this.apdao.all(sql_getUmpires);
  }

  getUmpireList() {
    this.sql_getUmpireList = `SELECT A.id, A.user_id, B.full_name 
    FROM umpire_tb A
    INNER JOIN user_tb B
    WHERE (A.user_id = B.id)
    ORDER BY A.id ASC`;
    return this.apdao.all(this.sql_getUmpireList);
  }

  addNewUmpire(postData) {
    this.sql_insertUmpireDetails = `INSERT INTO umpire_tb(user_id) 
    VALUES(${postData.userId})`;
    return this.apdao.run(this.sql_insertUmpireDetails);
  }

  updateUmpire(putData) {
    this.sql_updateUmpireDetails = `UPDATE umpire_tb SET user_id=${putData.userId}
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateUmpireDetails);
  }

  deleteUmpire(id) {
    this.sql_deleteUmpireDetails = `DELETE FROM umpire_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteUmpireDetails);
  }

  // ======================================================================================= //
  // ========================================   VENUE  ===================================== //
  getVenueUsingId(id) {
    let sql_getVenue = `SELECT id, venue_name, street, city, state, zip FROM venue_tb
    WHERE id = ${id}`;
    let result = this.apdao.all(sql_getVenue);
    return result;
  }
  getVenueUsingQuery(query) {
    let queryCol = [
      "id",
      "venue_name",
      "street",
      "city",
      "state",
      "zip",
      "country"
    ];
    let columns = [
      "id",
      "venue_name",
      "street",
      "city",
      "state",
      "zip",
      "country"
    ];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    let sql_getVenue =
      `SELECT id, venue_name, street, city, state, zip, country FROM venue_tb WHERE ` +
      getsql;
    return this.apdao.all(sql_getVenue);
  }

  getVenueList() {
    this.sql_getVenueList = `SELECT id, venue_name, street, city, state, zip, country FROM venue_tb ORDER BY id ASC`;
    return this.apdao.all(this.sql_getVenueList);
  }

  addNewVenue(postData) {
    this.sql_insertVenueDetails = `INSERT INTO venue_tb(venue_name, street, city, state, zip, country) 
    VALUES('${postData.venueName}','${postData.street}','${postData.city}',
    '${postData.state}','${postData.zip}','${postData.country}')`;
    return this.apdao.run(this.sql_insertVenueDetails);
  }

  updateVenue(putData) {
    this.sql_updateVenueDetails = `UPDATE venue_tb SET venue_name='${putData.venueName}', 
    street='${putData.street}', city='${putData.city}', state='${putData.state}', 
    zip='${putData.zip}', country='${putData.country}' 
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateVenueDetails);
  }

  deleteVenue(id) {
    this.sql_deleteVenueDetails = `DELETE FROM venue_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteVenueDetails);
  }

  // ======================================================================================= //
  // ========================================   COUNTRY_STATE  ===================================== //

  getCSList() {
    this.sql_getCSList = `SELECT id, country_name, state_name FROM country_state_tb ORDER BY id ASC`;
    return this.apdao.all(this.sql_getCSList);
  }

  // ======================================================================================= //
  // ========================================   COUNTRY ===================================== //

  getCountryList() {
    this.sql_getCountryList = `SELECT id, country_name FROM country_tb ORDER BY id ASC`;
    return this.apdao.all(this.sql_getCountryList);
  }

  // async function getHomPgDt() {
  //   let dbfile_path =
  //     "E:\\React\\umpire_schedule\\cricExtra\\db_code\\sqlite3_db\\cricextra_db";
  //   let uid = 2;
  //   let a = new sqlClass(dbfile_path);
  //   let b = await a.getUserHomePage(uid);
  //   console.log(b);
  // }

  // getHomPgDt();

  // ======================================================================================= //
  // ==================================   REQUEST  =================================== //
  getRequestById(id) {
    let sql_getRequest = `SELECT A.id, A.title, IFNULL(B.request_template, "") 
    request_template, IFNULL(A.description, "") description, C.full_name requestor, C.email_id, 
    C.phone_no, F.request_status, IFNULL(A.sport_type, "") sport_type, 
    IFNULL(A.address, "") address, 
    IFNULL(A.date, "") date, IFNULL(A.time, "") time, IFNULL(A.match_id, "") match_id,
    A.created, A.last_modified
    FROM request_tb A 
    LEFT JOIN request_template_tb B ON (A.request_template_id = B.id) 
    LEFT JOIN user_tb C ON (A.requestor_id = C.id) 
    LEFT JOIN request_status_tb F ON (A.request_status_id = F.id)
    WHERE A.id = ${id} ORDER BY A.id DESC`;
    let result = this.apdao.all(sql_getRequest);
    return result;
  }
  getRequestUsingQuery(query) {
    let queryCol = [
      "id",
      "request_template_id",
      "requestor_id",
      "request_status_id",
      "sport_type",
      "address",
      "date",
      "time",
      "match_id"
    ];
    let columns = [
      "A.id",
      "A.request_template_id",
      "A.requestor_id",
      "A.request_status_id",
      "A.sport_type",
      "A.address",
      "A.date",
      "A.time",
      "A.match_id"
    ];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    let sql_getPlayers = `SELECT A.id, A.title, IFNULL(B.request_template, "") 
      request_template, IFNULL(A.description, "") description, C.full_name requestor, C.email_id, 
      C.phone_no, F.request_status, IFNULL(A.sport_type, "") sport_type, 
      IFNULL(A.address, "") address, 
      IFNULL(A.date, "") date, IFNULL(A.time, "") time, IFNULL(A.match_id, "") match_id,
      A.created, A.last_modified
      FROM request_tb A 
      LEFT JOIN request_template_tb B ON (A.request_template_id = B.id) 
      LEFT JOIN user_tb C ON (A.requestor_id = C.id) 
      LEFT JOIN request_status_tb F ON (A.request_status_id = F.id)
      WHERE ${getsql} ORDER BY A.id DESC`;
    return this.apdao.all(sql_getPlayers);
  }
  getRequestList() {
    this.sql_getRequestList = `SELECT A.id, A.title, IFNULL(B.request_template, "") 
    request_template, IFNULL(A.description, "") description, C.full_name requestor, C.email_id, 
    C.phone_no, F.request_status, IFNULL(A.sport_type, "") sport_type, 
    IFNULL(A.address, "") address, 
    IFNULL(A.date, "") date, IFNULL(A.time, "") time, IFNULL(A.match_id, "") match_id, 
    A.created, A.last_modified
    FROM request_tb A 
    LEFT JOIN request_template_tb B ON (A.request_template_id = B.id) 
    LEFT JOIN user_tb C ON (A.requestor_id = C.id) 
    LEFT JOIN request_status_tb F ON (A.request_status_id = F.id)
    ORDER BY A.id DESC`;
    return this.apdao.all(this.sql_getRequestList);
  }
  // getRequestList() {
  //   this.sql_getRequestList = `SELECT A.id, A.title, IFNULL(B.request_template, "")
  //   request_template, IFNULL(A.description, "") description, C.full_name requestor, C.email_id,
  //   F.request_status, IFNULL(D.sport_type, "") sport_type,
  //   IFNULL(A.address, "") address, IFNULL(E.venue_name, "") venue_name,
  //   IFNULL(A.date, "") date, IFNULL(A.time, "") time, IFNULL(A.match_id, "") match_id
  //   FROM request_tb A
  //   LEFT JOIN request_template_tb B ON (A.request_template_id = B.id)
  //   LEFT JOIN user_tb C ON (A.requestor_id = C.id)
  //   LEFT JOIN sport_type_tb D ON (A.sport_type_id = D.id)
  //   LEFT JOIN venue_tb E ON (A.venue_id = E.id)
  //   LEFT JOIN request_status_tb F ON (A.request_status_id = F.id)
  //   ORDER BY A.id ASC`;
  //   return this.apdao.all(this.sql_getRequestList);
  // }
  addNewRequest(postData) {
    this.sql_insertRequestDetails = `INSERT INTO request_tb(title, request_template_id, description, 
      requestor_id, request_status_id, sport_type, address, venue_id, date, 
      time, match_id, created, last_modified)
    VALUES('${postData.title}','${postData.requestTemplateId}','${postData.description}',
    '${postData.requestorId}','${postData.requestStatusId}','${postData.sportType}','${postData.address}',
    '${postData.venueId}','${postData.date}','${postData.time}','${postData.matchId}','${postData.created}',
    '${postData.lastModified}')`;
    return this.apdao.run(this.sql_insertRequestDetails);
  }
  updateRequest(putData) {
    this.sql_updateRequestDetails = `UPDATE request_tb SET title='${putData.title}', 
    request_template_id='${putData.requestTemplateId}', description='${putData.description}', 
    requestor_id='${putData.requestorId}', request_status_id='${putData.requestStatusId}', 
    sport_type='${putData.sportType}',address='${putData.address}',
    date='${putData.date}',time='${putData.time}',match_id='${putData.matchId}',
    last_modified='${putData.lastModified}'
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateRequestDetails);
  }
  deleteRequest(id) {
    this.sql_deleteRequest = `DELETE FROM request_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteRequest);
  }
  closeRequest(id) {
    this.sql_closeRequest = `UPDATE request_tb SET status = 'Closed' WHERE id = ${id}`;
    return this.apdao.run(this.sql_closeRequest);
  }
  getRequestTemplateList() {
    this.sql_getRequestTemplateList = `SELECT id, request_template
    FROM request_template_tb ORDER BY request_template ASC`;
    return this.apdao.all(this.sql_getRequestTemplateList);
  }
  getSportTypeList() {
    this.sql_getSportTypeList = `SELECT id, sport_type
    FROM sport_type_tb ORDER BY sport_type ASC`;
    return this.apdao.all(this.sql_getSportTypeList);
  }
  getRequestStatusList() {
    this.sql_getRequestStatusList = `SELECT id, request_status
    FROM request_status_tb ORDER BY request_status ASC`;
    return this.apdao.all(this.sql_getRequestStatusList);
  }
  // ***************************comments******************************************
  getRequestCommentByQuery(query) {
    let queryCol = ["id", "request_id", "user_id"];
    let columns = ["A.id", "A.request_id", "A.user_id"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    if (getsql == "") {
      getsql += `(A.user_id = B.id)`;
    } else {
      getsql += ` AND (A.user_id = B.id)`;
    }
    let sql_getRequestCommentByQuery = `SELECT A.id, A.request_id, A.comment, A.user_id, B.full_name, 
    B.email_id, A.created, A.last_modified 
    FROM request_comment_tb A, user_tb B 
    WHERE ${getsql} ORDER BY A.id ASC`;
    return this.apdao.all(sql_getRequestCommentByQuery);
  }
  getRequestCommentList() {
    this.sql_getRequestCommentList = `SELECT A.id, A.request_id, A.comment, A.user_id, B.full_name, 
    B.email_id, A.created, A.last_modified 
    FROM request_comment_tb A, user_tb B 
    WHERE A.user_id = B.id
    ORDER BY A.request_id, created ASC`;
    return this.apdao.all(this.sql_getRequestCommentList);
  }
  addNewComment(postData) {
    this.sql_insertCommentDetails = `INSERT INTO request_comment_tb(request_id, comment, user_id, 
      created, last_modified)
    VALUES('${postData.requestId}','${postData.comment}','${postData.userId}',
    '${postData.created}','${postData.lastModified}')`;
    return this.apdao.run(this.sql_insertCommentDetails);
  }
  updateComment(putData) {
    this.sql_updateCommentDetails = `UPDATE request_comment_tb SET comment='${putData.comment}', 
    last_modified='${putData.last_modified}'
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateCommentDetails);
  }
  deleteComment(id) {
    this.sql_deleteComment = `DELETE FROM request_comment_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteComment);
  }

  // ======================================================================================= //
  // ==================================   IMAGE  =================================== //
  getImageByUserId(userId) {
    this.sql_getImageByUserId = `SELECT A.id, A.user_id, B.full_name, B.email_id, A.image, A.created, 
    A.last_modified 
    FROM user_image_tb A, user_tb B WHERE A.user_id = B.id AND A.user_id = ${userId}
    ORDER BY A.id ASC`;
    return this.apdao.all(this.sql_getImageByUserId);
  }
  getImageByUserIdS3(userId) {
    this.sql_getImageByUserId = `SELECT A.id, A.user_id, B.full_name, B.email_id, A.image_data, A.created, 
    A.last_modified 
    FROM user_image_data_tb A, user_tb B WHERE A.user_id = B.id AND A.user_id = ${userId}
    ORDER BY A.id ASC`;
    return this.apdao.all(this.sql_getImageByUserId);
  }
  getImageUsingQuery(query) {
    let queryCol = ["id", "user_id", "created", "last_modified"];
    let columns = ["A.id", "A.user_id", "A.created", "A.last_modified"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    if (query.email_id && query.email_id !== "") {
      if (getsql == "") {
        getsql += `A.user_id = (SELECT id FROM  user_tb WHERE email_id = '${query.email_id}' COLLATE NOCASE)`;
      } else {
        getsql += ` AND A.user_id = (SELECT id FROM  user_tb WHERE email_id = '${query.email_id}' COLLATE NOCASE)`;
      }
    }
    let sql_getImage =
      `SELECT A.id, A.user_id, B.full_name, B.email_id, A.image, A.created, A.last_modified 
      FROM user_image_tb A, user_tb B WHERE A.user_id = B.id AND ` + getsql;
    return this.apdao.all(sql_getImage);
  }
  getImageUsingQueryS3(query) {
    let queryCol = ["id", "user_id", "created", "last_modified"];
    let columns = ["A.id", "A.user_id", "A.created", "A.last_modified"];
    let getsql = "";
    getsql += this.getSQLUsingQuery(query, columns, queryCol);
    if (query.email_id && query.email_id !== "") {
      if (getsql == "") {
        getsql += `A.user_id = (SELECT id FROM  user_tb WHERE email_id = '${query.email_id}' COLLATE NOCASE)`;
      } else {
        getsql += ` AND A.user_id = (SELECT id FROM  user_tb WHERE email_id = '${query.email_id}' COLLATE NOCASE)`;
      }
    }
    let sql_getImage =
      `SELECT A.id, A.user_id, B.full_name, B.email_id, A.image_data, A.created, A.last_modified 
      FROM user_image_data_tb A, user_tb B WHERE A.user_id = B.id AND ` +
      getsql;
    return this.apdao.all(sql_getImage);
  }
  getImageList() {
    this.sql_getImageList = `SELECT A.id, A.user_id, B.full_name, B.email_id, A.image, A.created, 
    A.last_modified 
    FROM user_image_tb A LEFT JOIN user_tb B ON (A.user_id = B.id)
    ORDER BY A.id ASC`;
    return this.apdao.all(this.sql_getImageList);
  }
  getImageListS3() {
    this.sql_getImageList = `SELECT A.id, A.user_id, B.full_name, B.email_id, A.image_data, A.created, 
    A.last_modified 
    FROM user_image_data_tb A LEFT JOIN user_tb B ON (A.user_id = B.id)
    ORDER BY A.id ASC`;
    return this.apdao.all(this.sql_getImageList);
  }
  addImageToDb(postData) {
    this.sql_insertImageDetails = `INSERT INTO user_image_tb(user_id, image, created, last_modified)
    VALUES('${postData.user_id}','${postData.image}','${postData.created}',
    '${postData.last_modified}')`;
    return this.apdao.run(this.sql_insertImageDetails);
  }
  addImageDataS3(postData) {
    this.sql_insertImageDataDetails = `INSERT INTO user_image_data_tb(user_id, image_data, created, 
    last_modified)
    VALUES('${postData.user_id}','${postData.image_data}','${postData.created}',
    '${postData.last_modified}')`;
    return this.apdao.run(this.sql_insertImageDataDetails);
  }
  updateImage(putData) {
    this.sql_updateImage = `UPDATE user_image_tb SET image='${putData.image}', 
    last_modified='${putData.last_modified}'
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateImage);
  }
  updateImageS3(putData) {
    this.sql_updateImage = `UPDATE user_image_data_tb SET image_data='${putData.image_data}', 
    last_modified='${putData.last_modified}'
    WHERE id = ${putData.id}`;
    return this.apdao.run(this.sql_updateImage);
  }
  deleteImage(id) {
    this.sql_deleteImage = `DELETE FROM user_image_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteImage);
  }
  deleteImageS3(id) {
    this.sql_deleteImage = `DELETE FROM user_image_data_tb WHERE id = ${id}`;
    return this.apdao.run(this.sql_deleteImage);
  }
}

module.exports = sqlClass;
