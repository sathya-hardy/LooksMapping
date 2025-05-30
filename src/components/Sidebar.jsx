import Slider from './Slider'
import PhotoRater from './PhotoRater'

export default function Sidebar({ value, setValue, sliderActive, setSliderActive }) {
  const styles = {
    sidebar: {
      position: 'absolute',
      top: '12rem',
      right: '3rem',
      width: '300px',
      background: 'rgba(255, 255, 255, 0.51)',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(7.4px)',
      WebkitBackdropFilter: 'blur(7.4px)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.44)',
    },
    sliderContainer: {
      flex: 1,
      paddingBottom: '3rem',
    },
    raterContainer: {
      flex: 1,
    }
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.sliderContainer}>
        <Slider
          value={value}
          setValue={setValue}
          sliderActive={sliderActive}
          setSliderActive={setSliderActive}
        />
      </div>
      <div style={styles.raterContainer}>
        <PhotoRater value={value} />
      </div>
    </div>
  )
}