export const SCL_TEMPLATES = {
    FB_MOTOR: `FUNCTION_BLOCK "ControlMotor"
{ S7_Optimized_Access := 'TRUE' }
VERSION : 0.1

VAR_INPUT
    Start : Bool;
    Stop : Bool;
    Fault : Bool;
END_VAR

VAR_OUTPUT
    Run : Bool;
    Error : Bool;
END_VAR

VAR_STAT
    s_State : Int; // 0: Stopped, 1: Running, 2: Fault
END_VAR

BEGIN
    CASE #s_State OF
        0: // STOPPED
            IF #Start AND NOT #Stop AND NOT #Fault THEN
                #s_State := 1;
            END_IF;
            
        1: // RUNNING
            IF #Stop OR #Fault THEN
                #s_State := IF #Fault THEN 2 ELSE 0;
            END_IF;
            
        2: // FAULT
            IF NOT #Fault THEN
                #s_State := 0;
            END_IF;
    END_CASE;
    
    #Run := (#s_State = 1);
    #Error := (#s_State = 2);
END_FUNCTION_BLOCK`,

    FC_SCALING: `FUNCTION "ScaleValue" : Real
{ S7_Optimized_Access := 'TRUE' }
VERSION : 0.1

VAR_INPUT
    RawValue : Int;
    InMin : Int;
    InMax : Int;
    OutMin : Real;
    OutMax : Real;
END_VAR

VAR_TEMP
    Normalized : Real;
END_VAR

BEGIN
    // Prevent division by zero
    IF #InMax = #InMin THEN
        #ScaleValue := #OutMin;
        RETURN;
    END_IF;
    
    #Normalized := INT_TO_REAL(#RawValue - #InMin) / INT_TO_REAL(#InMax - #InMin);
    #ScaleValue := #Normalized * (#OutMax - #OutMin) + #OutMin;
END_FUNCTION`,

    DB_CONFIG: `DATA_BLOCK "GlobalConfig"
{ S7_Optimized_Access := 'TRUE' }
VERSION : 0.1
NON_RETAIN
   STRUCT 
      MaxPressure : Real := 10.5;
      MinLevel : Real := 2.0;
      SystemEnabled : Bool := TRUE;
      OpMode : Int := 1; // 1: Auto, 2: Manual
   END_STRUCT;

BEGIN
END_DATA_BLOCK`
};
