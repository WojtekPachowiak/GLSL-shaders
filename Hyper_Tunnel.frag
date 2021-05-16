// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    float mult = 1.0;
	vec2 st = gl_FragCoord.xy*mult/u_resolution;
    st = st - vec2(0.5,0.5);
    float pct = 0.0;
	
    
    float time = u_time*0.5;
    float timeSwitch = mod(time,5.0); 
    float timeGate = mod(time,2.5);
    float dist = distance(st,vec2(0.));
    if (timeSwitch < 2.5)
    	pct = sin(pow(floor(dist*10.),timeGate));
    else if(timeSwitch >= 2.5)
    	pct = sin(pow(dist*100.,timeGate));

    vec3 color = vec3(pct,pct,pct);

	gl_FragColor = vec4( color, 1.0 );
}
