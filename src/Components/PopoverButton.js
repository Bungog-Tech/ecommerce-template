import React from "react";
import { Button,Popover,OverlayTrigger,ButtonToolbar } from "react-bootstrap";

export default function PopOverButton(){
    const popoverLeft = (
        <Popover id="popover-positioned-left" title="Popover left">
          <Button variant="outline-primary" className="over-buttons"><i class="far fa-edit"></i> Edit</Button><br/>
          <Button variant="outline-warning" className="over-buttons"><i class="fas fa-archive"></i> Archive</Button><br/>
          <Button variant="outline-danger" className="over-buttons"><i class="	far fa-trash-alt"></i> Delete</Button>
        </Popover>
      );
  return( 
 <>
  <ButtonToolbar>
    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverLeft}>
      <Button><i class="fa fa-bars"></i></Button>
    </OverlayTrigger>
   </ButtonToolbar>
 </>
  )
}