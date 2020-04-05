import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import themeVariables from '_theme';

const iconPropTypes = { size: PropTypes.number, color: PropTypes.string };
const iconDefaultProps = { size: themeVariables.ifs6, color: themeVariables.white };

export const CommentIcon = (props) => <IconFontAwesome name={'comment'} {...props} />;

export const ClockIcon = (props) => <IconFontAwesome name={'clock'} {...props} />;

export const CalendarIcon = (props) => <IconFontAwesome name={'calendar-alt'} {...props} />;

export const CloseIcon = (props) => <IconFontAwesome name={'times'} {...props} />;

export const LoginIcon = (props) => <IconMaterial name={'login'} {...props} />;

export const LogoutIcon = (props) => <IconMaterial name={'logout'} {...props} />;

export const MapMarkerIcon = (props) => <IconFontAwesome name={'map-marker-alt'} {...props} />;

export const InboxIcon = (props) => <IconFontAwesome name={'inbox'} {...props} />;

export const NavigateToLocationIcon = (props) => <IconFontAwesome name={'location-arrow'} {...props} />;

export const PhoneIcon = (props) => <IconFontAwesome name={'phone'} {...props} />;

export const MenuIcon = (props) => <Icon type={'MaterialCommunityIcons'} name={'menu'} {...props} />;

export const BackIcon = (props) => <Icon type={'MaterialCommunityIcons'} name={'chevron-left'} {...props} />;

export const BookIcon = (props) => <IconFontAwesome name={'book'} {...props} />;

export const AddImagePlaceIcon = (props) => <IconFontAwesome name={'camera-retro'} {...props} />;

export const UserIcon = (props) => <IconFontAwesome name={'user-tie'} {...props} />;

export const SaveIcon = (props) => <IconFontAwesome name={'save'} {...props} />;

export const SearchIcon = (props) => <IconFontAwesome name={'search'} {...props} />;

export const CheckIcon = (props) => <IconFontAwesome name={'check'} {...props} />;

export const HomeIcon = (props) => <IconFontAwesome name={'home'} color={themeVariables.white} {...props} />;

export const PlusIcon = (props) => <Icon type={'MaterialCommunityIcons'} name={'plus'} {...props} />;

export const DayWorkIcon = (props) => <IconMaterial name={'city'} {...props} />;

export const NewReleasesIcon = (props) => <IconMaterial name={'new-box'} {...props} />;

export const HolidayIcon = (props) => <IconMaterial name={'cancel'} {...props} />;

export const RecompenseWorkIcon = (props) => <IconMaterial name={'transfer'} {...props} />;

export const TakeLeaveIcon = (props) => <IconFontAwesome name={'file-alt'} {...props} />;

export const TimeAdjustmentIcon = (props) => <IconFontAwesome name={'clock'} {...props} />;

export const PublicMobileDeviceIcon = (props) => <IconFontAwesome name={'mobile-alt'} {...props} />;

export const NotPublicMobileDeviceIcon = (props) => <IconFontAwesome name={'mobile'} {...props} />;

export const CardAngleRightIcon = (props) => <IconFontAwesome name={'angle-right'} {...props} />;

export const QRIcon = (props) =>  <IconMaterial name="qrcode" {...props} />;

export const ShareIcon = (props) => <IconFontAwesome name={'share'} {...props} />;

export const RefreshIcon = (props) => <IconFontAwesome name={'redo'} {...props} />;

export const SettingIcon = (props) => <IconMaterial name="settings-outline" {...props} />;

export const NotificationIcon = (props) => <IconMaterial name="bell" {...props} />;

ClockIcon.propTypes = iconPropTypes;
ClockIcon.defaultProps = iconDefaultProps;

CalendarIcon.propTypes = iconPropTypes;
CalendarIcon.defaultProps = iconDefaultProps;

CloseIcon.propTypes = iconPropTypes;
CloseIcon.defaultProps = iconDefaultProps;

LoginIcon.propTypes = iconPropTypes;
LoginIcon.defaultProps = iconDefaultProps;

LogoutIcon.propTypes = iconPropTypes;
LogoutIcon.defaultProps = iconDefaultProps;

MapMarkerIcon.propTypes = iconPropTypes;
MapMarkerIcon.defaultProps = iconDefaultProps;

NavigateToLocationIcon.propTypes = iconPropTypes;
NavigateToLocationIcon.defaultProps = iconDefaultProps;

BookIcon.propTypes = iconPropTypes;
BookIcon.defaultProps = iconDefaultProps;

AddImagePlaceIcon.propTypes = iconPropTypes;
AddImagePlaceIcon.defaultProps = iconDefaultProps;

UserIcon.propTypes = iconPropTypes;
UserIcon.defaultProps = iconDefaultProps;

InboxIcon.propTypes = iconPropTypes;
InboxIcon.defaultProps = iconDefaultProps;

SaveIcon.propTypes = iconPropTypes;
SaveIcon.defaultProps = iconDefaultProps;

SearchIcon.propTypes = iconPropTypes;
SearchIcon.defaultProps = iconDefaultProps;

DayWorkIcon.propTypes = iconPropTypes;
DayWorkIcon.defaultProps = iconDefaultProps;

HolidayIcon.propTypes = iconPropTypes;
HolidayIcon.defaultProps = iconDefaultProps;

RecompenseWorkIcon.propTypes = iconPropTypes;
RecompenseWorkIcon.defaultProps = iconDefaultProps;

TakeLeaveIcon.propTypes = iconPropTypes;
TakeLeaveIcon.defaultProps = iconDefaultProps;

TimeAdjustmentIcon.propTypes = iconPropTypes;
TimeAdjustmentIcon.defaultProps = iconDefaultProps;

CommentIcon.propTypes = iconPropTypes;
CommentIcon.defaultProps = iconDefaultProps;

PublicMobileDeviceIcon.propTypes = iconPropTypes;
PublicMobileDeviceIcon.defaultProps = iconDefaultProps;

NotPublicMobileDeviceIcon.propTypes = iconPropTypes;
NotPublicMobileDeviceIcon.defaultProps = iconDefaultProps;

CardAngleRightIcon.propTypes = iconPropTypes;
CardAngleRightIcon.defaultProps = iconDefaultProps;

QRIcon.propTypes = iconPropTypes;
QRIcon.defaultProps = iconDefaultProps;

ShareIcon.propTypes = iconPropTypes;
ShareIcon.defaultProps = iconDefaultProps;

RefreshIcon.propTypes = iconPropTypes;
RefreshIcon.defaultProps = iconDefaultProps;

PhoneIcon.propTypes = iconPropTypes;
PhoneIcon.defaultProps = iconDefaultProps;

SettingIcon.propTypes = iconPropTypes;
SettingIcon.defaultProps = iconDefaultProps;

CheckIcon.propTypes = iconPropTypes;
CheckIcon.defaultProps = iconDefaultProps;

NewReleasesIcon.propTypes = iconPropTypes;
NewReleasesIcon.defaultProps = iconDefaultProps;
