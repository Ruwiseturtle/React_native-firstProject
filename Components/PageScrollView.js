import React, { forwardRef } from "react";
import { PageScrollView as OriginalPageScrollView } from "pagescrollview";

const PageScrollView = forwardRef((props, ref) => {
  return <OriginalPageScrollView {...props} ref={ref} />;
});

export default PageScrollView;
