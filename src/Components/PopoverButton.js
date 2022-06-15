import React from "react";
import {
  Button,
  Popover,
  OverlayTrigger,
  ButtonToolbar,
} from "react-bootstrap";
import UnarchiveProduct from "./UnarchiveProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export default function PopOverButton(props) {
  const { productData, fetchData, isActive } = props;
  const popoverLeft = (
    <Popover id="popover-positioned-left" title="Popover left">
      <EditProduct fetchData={fetchData} product={productData} />
      <UnarchiveProduct
        fetchData={fetchData}
        productId={productData}
        isActive={isActive}
      />
      <DeleteProduct fetchData={fetchData} product={productData} />
    </Popover>
  );
  return (
    <>
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          // rootClose
          placement="left"
          overlay={popoverLeft}
        >
          <Button>
            <i className="fa fa-bars"></i>
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>
    </>
  );
}
