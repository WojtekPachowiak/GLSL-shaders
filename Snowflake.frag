// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float SmoothTrapezoid(float smoothing, float freq, float coord){
    return smoothstep(-smoothing,smoothing, cos(coord*freq));
}
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
	st = (st - vec2(0.5))*2.000;
    
    vec2 pos = st;
    float r = length(pos);
    float a = atan(pos.y,pos.x);

    float f = cos(a*1000.);
    
    color = vec3( 1.-smoothstep(f,f+0.02,r) );
	// color = vec3(SmoothTrapezoid(0.016,13.632,st.x) + SmoothTrapezoid(0.016,13.632,st.y));
    
    gl_FragColor = vec4(color, 1.0);
}
