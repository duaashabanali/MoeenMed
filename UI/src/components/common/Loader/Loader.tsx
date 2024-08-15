import React from 'react';
import classes from "@/components/common/Loader/Loader.module.css";

const Loader = () => {
    return (
        <div className={classes.loader_wrapper}>
            <div className={classes.loading}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;
