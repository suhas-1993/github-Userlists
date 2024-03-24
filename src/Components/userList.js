import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Box,
  Grid,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./userList.css";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const gitUsers = async () => {
      try {
        const response = await axios.get("https://api.github.com/users");
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    };
    gitUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h2" className="heading">
        GitHub Users
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {user.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Link to={`/user/${user.login}`} target="_blank" className="userRedirect">
                <Card className="userCard">
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      src={user.avatar_url}
                      alt={user.login}
                      style={{ width: "150px", height: "150px" }}
                    />
                    <Typography variant="h5" className="userName">
                      {user.login}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserList;
