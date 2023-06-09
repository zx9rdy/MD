import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { I18n } from "react-i18nify";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    marginTop: "10px"
  },
  button: {
    marginLeft: 10
  },
  selectedItem: {
    marginTop: "10px",
    color: "red"
  }
});

class CheckboxList extends React.Component {
  handleAction = index => {
    this.props.toggleDrawer();
    this.props.switchCurrent(index);
    this.props.openFile(index);
  };

  editTitle = id => {
    let target = document.getElementById(id);
    let span = target.querySelector("div span");
    span.setAttribute("contentEditable", true);
    span.focus();
    span.style.border = "1px solid grey";
    span.addEventListener("click", e => {
      if (span.getAttribute("contentEditable") === "true") {
        e.stopPropagation();
      }
    });
    span.addEventListener("keydown", e => e.stopPropagation());
    span.addEventListener("blur", () => {
      span.setAttribute("contentEditable", false);
      span.style.border = "none";
      this.props.updateTitle(id, span.innerText);
    });
  };

  render() {
    const { classes, fileList, deleteAction, current } = this.props;
    return (
      <List className={classes.root}>
        {fileList.map((item, index) => (
          <ListItem
            id={item.id}
            key={item.id}
            index={index}
            selected={index === current}
            className="title-list-ite"
            dense
            button
            onClick={() => {
              this.handleAction(index);
            }}
          >
            <ListItemText
              className="doc-title-input"
              primary={item.title}
              title={item.title}
            />
            <ListItemSecondaryAction className="file-action-icon">
              <Tooltip title={I18n.t("rename")} placement="top">
                <IconButton
                  className="doc-action-btn"
                  onClick={() => this.editTitle(item.id)}
                >
                  <i className="material-icons">edit</i>
                </IconButton>
              </Tooltip>
              <Tooltip title={I18n.t("delete")} placement="top">
                <IconButton
                  className="doc-action-btn"
                  onClick={() => deleteAction(item.id)}
                >
                  <i className="material-icons">delete</i>
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxList);
