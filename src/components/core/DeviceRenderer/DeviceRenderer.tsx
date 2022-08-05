import { useGetChannelDeviceComponent } from '../../../store/channels/hooks/useGetChannelDevice';
import { useGetChannels } from '../../../store/channels/hooks/useGetChannels';
import { ChannelType } from '../../../types';

type DeviceComponentProps = {
  data: ChannelType;
};

const DeviceComponent = ({ data }: DeviceComponentProps) => {
  return useGetChannelDeviceComponent(data) || <></>;
};

export const DeviceRenderer = () => {
  const { channels } = useGetChannels();
  return (
    <>
      {channels.map((data) => (
        <DeviceComponent data={data} key={data.uuid} />
      ))}
    </>
  );
};
