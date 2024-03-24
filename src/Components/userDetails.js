import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import './userDetails.css';

const UserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const gitUsersDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    };
    gitUsersDetails();
  }, [username]);

  return (
    <Box>
      <Typography variant="h2" className="heading">
        GitHub Users
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {user ? (
            <Card style={{
                background:"linear-gradient(to right, #ffefba, #ffffff)"
              }}>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" className="userID">
                  {user.login}
                </Typography>
                <Avatar
                  src={user.avatar_url}
                  alt={user.login}
                  style={{ width: "250px", height: "250px" }}
                />
                <Typography variant="body1" className="userDetails">
                  Name: {user.name || "NA"}
                </Typography>
                <Typography variant="body1" className="userDetails">
                  Location: {user.location || "NA"}
                </Typography>
                <Typography variant="body1" className="userDetails">
                  Company: {user.company || "NA"}
                </Typography>
                <Typography variant="body1" className="userDetails">
                  Followers: {user.followers || "NA"}
                </Typography>
                <Typography variant="body1" className="userDetails">
                  Following: {user.following || "NA"}
                </Typography>
                <Typography variant="body1" className="userDetails">
                  Public Repositories: {user.public_repos || "NA"}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            ""
          )}
        </Stack>
      )}
    </Box>
  );
};

export default UserDetails;
