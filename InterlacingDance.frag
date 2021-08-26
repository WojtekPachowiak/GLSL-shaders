// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float Rect2(vec2 pos, float length, float height, vec2 coord){
    float rect= step(pos.x,coord.x) * step(pos.y,coord.y) * step(1.-length - pos.x, 1.0-coord.x) * step(1.-height - pos.y,1.0-coord.y);
    return rect;
}
mat2 Rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, -s, s, c);
}

void main() {
    vec2 st = gl_FragCoord.xy;
    float time = u_time *0.9;
    float bang =0.400;
    float naprzemian = 0.4;
    
    st.x = st.x + (sin(time )*bang) * 400. * (ceil(sin(st.y*naprzemian))-0.5);
    st.y = st.y + (sin(time)*bang) * 400. * (ceil(cos(st.x*naprzemian))-0.5);

    st /= u_resolution.xy; 
    
    // st.x *= u_resolution.x/u_resolution.y;
    st = (st - vec2(0.5))*2.;
    st *= Rotate(time);
    
    
    float rectangle = Rect2(vec2(-1.),2.,2.,st);
    float circle = smoothstep(0.49,0.5,length(st));
    vec3 color = vec3(rectangle * circle);
    // color.r = color.r * sin(time);
    gl_FragColor = vec4(color,1.0);
}