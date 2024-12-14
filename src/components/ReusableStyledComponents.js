import styled from 'styled-components'

export const ReUseDiv = styled.div`
  height: ${props => props.h};
  width: ${props => props.w};

  min-height:${props=>props.minH};
  max-height:${props=>props.maxH};
  min-width:${props=>props.minW};
  max-width:${props=>props.maxW};

  padding: ${props => props.p};
  padding-left: ${props => props.pl};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-right: ${props => props.pr};

  margin: ${props => props.m};
  margin-left: ${props => props.ml};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-right: ${props => props.mr};

  background-color: ${props => props.bg};
  background-image:url(${props=>props.bgImgUrl});
  background-size:${props=>props.bgSize};
  order:${props=>props.order};
  display: ${props => props.display};
  flex-direction: ${props => props.fD};
  justify-content: ${props => props.jC};
  align-items: ${props => props.aI};
  flex-wrap: ${props => props.fW};
  align-self:${props=>props.aS};
  @media screen and (min-width:767px){ // Bigger Screens
    order:${props=>props.orderB};
    display: ${props => props.displayB};
    flex-direction: ${props => props.fDB};
    justify-content: ${props => props.jCB};
    align-items: ${props => props.aIB};
    flex-wrap: ${props => props.fWB};
    align-self:${props=>props.aSB};
    height: ${props => props.hB};
    width: ${props => props.wB};
    top: ${props => props.topB};
    right: ${props => props.rightB};
    bottom: ${props => props.bottomB};
    left: ${props => props.leftB};
    padding: ${props => props.pB};
    padding-left: ${props => props.plB};
    padding-top: ${props => props.ptB};
    padding-bottom: ${props => props.pbB};
    padding-right: ${props => props.prB};

    margin: ${props => props.mB};
    margin-left: ${props => props.mlB};
    margin-top: ${props => props.mtB};
    margin-bottom: ${props => props.mbB};
    margin-right: ${props => props.mrB};
  }

  border: ${props => props.border};
  border-radius: ${props => props.br};

  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};

  z-index: ${props => props.zIndex};
  
  color: ${props => props.color};
  font-size: ${props => props.fs};
  font-weight: ${props => props.fw};
  text-align: ${props => props.tAlign};
  line-height: ${props => props.lH};
  
  box-shadow: ${props => props.boxShadow};
  
  overflow: ${props => props.overflow};
  overflow-x: ${props => props.oX};
  overflow-y: ${props => props.oY};
  
  cursor: ${props => props.cursor};
`;


export const ReUseText = styled.span`
  /* Text Content */
  color: ${props => props.color};
  font-size: ${props => props.fs};
  font-weight: ${props => props.fw};
  font-family: ${props => props.ff};
  line-height: ${props => props.lH};
  text-align: ${props => props.tAlign};
  text-transform: ${props => props.tTransform};
  text-decoration: ${props => props.tDecoration};
  letter-spacing: ${props => props.ls};
  word-spacing: ${props => props.ws};
  white-space: ${props => props.wSpace};
  overflow-wrap: ${props => props.oWrap};

  @media screen and (min-width:769px){
    font-size: ${props => props.fsB};
    text-align: ${props => props.tAlignB};
  }

  /* Background and Borders */
  background-color: ${props => props.bg};
  border: ${props => props.border};
  border-radius: ${props => props.br};

  /* Padding and Margins */
  margin: ${props => props.m};
  margin-left: ${props => props.ml};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-right: ${props => props.mr};
  padding: ${props => props.p};
  padding-left: ${props => props.pl};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-right: ${props => props.pr};

  /* Display and Positioning */
  display: ${props => props.display};
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  z-index: ${props => props.zIndex};

  /* Other */
  cursor: ${props => props.cursor};
`;

export const ReUseButton = styled.button`
  /* Dimensions */
  width: ${props => props.w};
  height: ${props => props.h};

  /* Spacing */
  padding: ${props => props.p};
  padding-left: ${props => props.pl};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-right: ${props => props.pr};
  margin: ${props => props.m};
  margin-left: ${props => props.ml};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-right: ${props => props.mr};

  /* Typography */
  color: ${props => props.color};
  font-size: ${props => props.fs};
  font-weight: ${props => props.fw};
  font-family: ${props => props.ff};
  text-align: ${props => props.tAlign};
  text-transform: ${props => props.tTransform};
  text-decoration:${props=>props.tD};
  @media screen and (min-width:769px){
    font-size: ${props => props.fsB};
  }

  /* Background & Borders */
  background-color: ${props => props.bg};
  border: ${props => props.border};
  border-radius: ${props => props.br};
  box-shadow: ${props => props.boxShadow};

  /* Display & Positioning */
  display: ${props => props.display};
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  z-index: ${props => props.zIndex};

  /* Interactivity */
  cursor: ${props => props.cursor || 'pointer'};
  transition: ${props => props.transition || '0.3s ease'};
  opacity: ${props => props.opacity};

  /* States */
  &:hover {
    background-color: ${props => props.hBg || props.bg};
    color: ${props => props.hColor || props.color};
    box-shadow: ${props => props.hBoxShadow || props.boxShadow};
  }

  &:active {
    transform: ${props => props.aTransform || 'scale(0.95)'};
    background-color: ${props => props.aBg || props.bg};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: ${props => props.disabledBg || props.bg};
  }
`;



export const ReUseImage = styled.img`
  /* Base Dimensions */
  width: ${props => props.w || '100%'};
  height: ${props => props.h || 'auto'};

  /* Border and Radius */
  border: ${props => props.border};
  border-radius: ${props => props.br};

  // Position
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  z-index: ${props => props.zIndex};


  /* Box Shadow */
  box-shadow: ${props => props.boxShadow};

  /* Spacing */
  margin: ${props => props.m};
  margin-left: ${props => props.ml};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-right: ${props => props.mr};
  padding: ${props => props.p};
  padding-left: ${props => props.pl};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-right: ${props => props.pr};

  /* Responsive Sizing */
  @media (max-width: 576px) {
    width: ${props => props.xsW};
    height: ${props => props.xsH || props.h || 'auto'};
  }

  @media (min-width: 576px)  {
    width: ${props => props.smW };
    height: ${props => props.smH || props.h || 'auto'};
  }

  @media screen and  (min-width: 768px)  {
    width: ${props => props.mdW };
    height: ${props => props.mdH};
  }

  @media (min-width: 992px)  {
    width: ${props => props.lgW};
    height: ${props => props.lgH};
  }

  @media (min-width: 1200px) {
    width: ${props => props.xlW};
    height: ${props => props.xlH};
  }
`;