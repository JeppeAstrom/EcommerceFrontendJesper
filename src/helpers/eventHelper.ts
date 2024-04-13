class EventHelper {
    public static isMouseEvent = (
      e:
        | Event
        | React.MouseEvent<HTMLElement>
        | React.TouchEvent<HTMLElement>
        | React.DragEvent<HTMLElement>
        | React.FormEvent<HTMLElement>
        | React.FocusEvent<HTMLElement>
    ): e is MouseEvent => e.type.startsWith('mouse');
  
    public static isTouchEvent = (
      e:
        | Event
        | React.MouseEvent<HTMLElement>
        | React.TouchEvent<HTMLElement>
        | React.DragEvent<HTMLElement>
        | React.FormEvent<HTMLElement>
        | React.FocusEvent<HTMLElement>
    ): e is TouchEvent => e.type.startsWith('touch');
  }
  
  export default EventHelper;
  