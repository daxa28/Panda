import * as styles from "./home.module.scss";
import React, { Fragment } from "react";
import { useAppSelector, useAppDispatch } from "../../core/redux/hooks";
import { fetchResult, luckSelector } from "../../core/redux/slices/luckSlice";
import pandaImage from "../../assets/images/panda.svg";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/Loader/Loader";

function Home() {
  const dispatch = useAppDispatch();
  const selectedLuck = useAppSelector(luckSelector);

  const luckLoading = selectedLuck.loading;
  const luckResult = selectedLuck.result;
  const luckError = selectedLuck.error;

  return (
    <Fragment>
      <h2 className={styles.title}>Home page</h2>
      <div className={styles.image}>
        <img src={pandaImage} alt="Logo of the React" />
      </div>
      <div className={styles.block}>
        <div className={styles.btn}>
          <Button
            onClick={() => dispatch(fetchResult())}
            disable={luckLoading ? luckLoading : false}
          >
            Try your luck
          </Button>
        </div>
        {luckLoading ? (
          <div className={styles.card}>
            <Loader />
          </div>
        ) : luckError.status ? (
          <div className={styles.card}>{luckError.text}</div>
        ) : luckResult && (
          <div className={styles.card}>{luckResult}</div>
        )}
      </div>
    </Fragment>
  );
}

export default Home;
