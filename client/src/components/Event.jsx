import styles from "./style.module.css";

function Event(props) {
  return (
    <div className={styles.card}>
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  );
}

export default Event;
