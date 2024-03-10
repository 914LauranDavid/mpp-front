import { List, ListItem, ListSubheader } from "@mui/material";
import * as React from "react";

function ElementList() {
  const handleClick = () => {
    console.log("congratulations for clicking");
  };

  return (
    <List>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  );
}

export default ElementList;
