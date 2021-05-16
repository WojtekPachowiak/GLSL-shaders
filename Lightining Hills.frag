// Author:
// Title: Lightining Hills

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float LinPlot(vec2 st) {    
    return step(0.052, abs(st.y - st.x));
}

float SinNorm(){
    float y = (sin(u_time)+1.0)/2.0;
    return y;
}

float AnyPlot(vec2 st, float pct){
    return smoothstep(100.,pct, st.y) - smoothstep(SinNorm(), pct , st.y);
  // return  smoothstep( pct-0.048, pct, st.y); 
          // - smoothstep( pct, pct+0.812, st.y);
}



void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color;
    
	
    float func = (sin(10.0*st.x)+1.5)/3.0;
    // float func1 = (sin(10.0*st.x)+1.5)/3.0;

    color = vec3(AnyPlot(st, func));
    
    gl_FragColor = vec4(color,1.0);
}