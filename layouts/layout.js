import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    // Use h-screen to make an element span the entire height of the viewport.
    <div className="flex h-screen bg-blue-400">
      {/* 
           w-3/5 set width 60%
           h-3/4 sets height to 75% of its panel
           lg:grid-cols-2, initializes div as grid layout, 
           flex-col, specifises flex direction
       */}
      <div className="m-auto">
        <div className="m-auto bg-slate-50 rounded-md w-4/5 h-3/4 grid lg:grid-cols-2">
          {/* START LEFT SIDE OF LAYOUT */}
          <div className={styles.imgStyle}>
            <div className={styles.cartoonImg}></div>
            <div className={styles.cloud_one}></div>
            <div className={styles.cloud_two}></div>
          </div>
          {/* END LEFT SIDE OF LAYOUT */}

          {/* START RIGHT SIDE OF LAYOUT */}
          <div className="right flex flex-col justify-evenly my-7">
            <div className="text-center ">{children}</div>
          </div>
          {/* START RIGHT SIDE OF LAYOUT */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
